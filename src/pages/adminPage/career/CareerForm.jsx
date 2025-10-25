import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CareerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // edit jika ada id
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    location: "",
    // age represented as [min, max]
    age: ["", ""],
    description: "",
    requirement: [],
    mapUrl: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      // Edit mode
      fetch(`${import.meta.env.VITE_API_URL}/careers`)
        .then((res) => res.json())
        .then((data) => {
          const found = data.data.find((c) => String(c.id) === id);
          if (found)
            setFormData({
              ...found,
              requirement: found.requirement || [],
              mapUrl: found.mapUrl ?? found.map_url ?? "",
              // normalize age into array [min, max]
              age: Array.isArray(found.age)
                ? found.age.map((a) => String(a))
                : found.age && typeof found.age === "string"
                ? found.age.split("-").map((s) => s.trim())
                : ["", ""],
              image: found.image ?? null,
            });
        });
    } else {
      // Create mode -> generate ID
      const newId = Date.now();
      setFormData((prev) => ({ ...prev, id: newId.toString() }));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgePartChange = (index, value) => {
    setFormData((prev) => {
      const nextAge = [...prev.age];
      nextAge[index] = value;
      return { ...prev, age: nextAge };
    });
  };

  // image upload removed — form now sends JSON payload without file

  const handleRequirementChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      requirement: e.target.value.split("\n")
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda belum login. Silakan login terlebih dahulu.");
      navigate("/admin-login");
      return;
    }

    setSubmitting(true);

    try {
      // Build payload object
      // Normalize age values to numbers when possible
      const normalizedAge = (formData.age || [])
        .filter((v) => v !== "" && v != null)
        .map((v) => (typeof v === "number" ? v : !isNaN(Number(v)) ? Number(v) : v));

      const payloadObj = {
        name: formData.name,
        location: formData.location,
        age: normalizedAge,
        description: formData.description,
        requirement: formData.requirement || [],
        mapUrl: formData.mapUrl || undefined,
      };

      const baseUrl = import.meta.env.VITE_API_URL || "";

      if (!baseUrl) {
        alert("No API configured (VITE_API_URL). Career created locally.");
      } else {
        // Send JSON payload (image removed)
        console.log("Payload (JSON):", payloadObj);

        if (id) {
          const res = await axios.put(`${baseUrl}/careers/${id}`, payloadObj, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          });
          console.log("Updated:", res.data);
          alert("Career berhasil diperbarui!");
        } else {
          const res = await axios.post(`${baseUrl}/careers`, payloadObj, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          });
          console.log("Created:", res.data);
          alert("Career berhasil dibuat!");
        }
      }

      navigate("/admin-careers");
    } catch (err) {
      console.error("Gagal menyimpan career:", err);
      alert(err.response?.data?.message || "Terjadi kesalahan saat menyimpan career.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg space-y-4"
      >
        <div className="flex justify-center mb-8">
          <img
            src="/images/logo.svg" // ganti sesuai path logo
            alt="Company Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        <h1 className="text-xl font-bold mb-4 text-center">
          {id ? "Edit Career" : "Create Career"}
        </h1>

        {/* ID */}

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Age (min / max) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Age (min - max)</label>
          <div className="flex gap-3">
            <input
              type="number"
              name="ageMin"
              value={formData.age[0]}
              onChange={(e) => handleAgePartChange(0, e.target.value)}
              className="w-1/2 border rounded-md p-2"
              placeholder="min age"
            />
            <input
              type="number"
              name="ageMax"
              value={formData.age[1]}
              onChange={(e) => handleAgePartChange(1, e.target.value)}
              className="w-1/2 border rounded-md p-2"
              placeholder="max age"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2 h-24"
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Requirements</label>
          <textarea
            value={formData.requirement.join("\n")}
            onChange={handleRequirementChange}
            className="w-full border rounded-md p-2 h-32"
          />
          <p className="text-xs text-gray-500 mt-1">
            Pisahkan setiap requirement dengan baris baru.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin-careers")}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? (id ? "Saving changes..." : "Creating...") : id ? "Save Changes" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CareerForm;

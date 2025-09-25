import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CareerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // akan ada jika mode edit
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    location: "",
    age: "",
    description: "",
    requirement: []
  });

  useEffect(() => {
    if (id) {
      // 🟠 Mode Edit -> Ambil data berdasarkan ID
      fetch("/data/careers.json")
        .then((res) => res.json())
        .then((data) => {
          const found = data.data.find((c) => String(c.id) === id);
          if (found) setFormData({ ...found, requirement: found.requirement || [] });
        });
    } else {
      // 🟢 Mode Create -> Generate ID otomatis
      const newId = Date.now(); // contoh pakai timestamp (unik)
      setFormData((prev) => ({ ...prev, id: newId.toString() }));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequirementChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      requirement: e.target.value.split("\n")
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // TODO: update ke backend
      alert(`Career updated! (ID: ${formData.id})`);
    } else {
      // TODO: create ke backend
      alert(`Career created! (ID: ${formData.id})`);
    }
    navigate("/admin/careers");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg space-y-4"
      >
        {/* ✅ Logo di atas Form */}
        <div className="flex justify-center mb-8">
          <img
            src="/images/logo.svg" // 🔹 Ganti path logo sesuai lokasi file kamu
            alt="Company Logo"
            className="h-15 w-auto object-contain"
          />
        </div>

        <h1 className="text-xl font-bold mb-4 text-center">
          {id ? "Edit Career" : "Create Career"}
        </h1>

        {/* ID (Auto Generated) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            readOnly
            className="w-full border rounded-md p-2 bg-gray-100 text-gray-600"
          />
          {!id && (
            <p className="text-xs text-gray-500 mt-1">
              ID generated automatically.
            </p>
          )}
        </div>

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

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
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
          <label className="block text-sm font-medium text-gray-700">
            Requirements
          </label>
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
            onClick={() => navigate("/admin/careers")}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            {id ? "Save Changes" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CareerForm;

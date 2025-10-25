import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const provinces = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bangka Belitung",
  "Bengkulu",
  "Lampung",
  "DKI Jakarta",
  "Jawa Barat",
  "Banten",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Papua Tengah",
  "Papua Pegunungan",
  "Papua Selatan",
  "Papua Barat Daya"
];

const OutletForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    province: "",
    openHours: "",
    phone: "",
    mapUrl: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      // ===== Edit Mode =====
      fetch(`${import.meta.env.VITE_API_URL}/outlets`)
        .then((res) => res.json())
        .then((data) => {
          const found = data.data.find((o) => String(o.id) === id);
              if (found)
                setFormData({
                  name: found.name || "",
                  address: found.address || "",
                  province: found.province || "",
                  openHours: found.openHours ?? found.open_hours ?? "",
                  phone: found.phone || "",
                  mapUrl: found.mapUrl ?? found.map_url ?? "",
                  image: null,
                });
              if (found?.image) setPreview(found.image);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ===== Handle Upload Gambar =====
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // store File object and show preview
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
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
      const formPayload = new FormData();
      // Do not send id in payload — backend will assign or update by URL
      formPayload.append("name", formData.name);
      formPayload.append("address", formData.address);
      formPayload.append("province", formData.province);
      formPayload.append("openHours", formData.openHours);
      formPayload.append("phone", formData.phone);
      formPayload.append("mapUrl", formData.mapUrl);
      if (formData.image) formPayload.append("image", formData.image);

      // Validate required fields (openHours and mapUrl must be non-empty strings)
      if (typeof formData.openHours !== "string" || !formData.openHours.trim()) {
        alert("openHours should not be empty and must be a string");
        return;
      }
      if (typeof formData.mapUrl !== "string" || !formData.mapUrl.trim()) {
        alert("mapUrl should not be empty and must be a string");
        return;
      }

      // debug entries
      for (const entry of formPayload.entries()) console.log("FormData:", entry[0], entry[1]);

      const baseUrl = import.meta.env.VITE_API_URL || "https://pak-ndut-backend-production.up.railway.app";

      if (id) {
        const response = await axios.put(`${baseUrl}/outlets/${id}`, formPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Outlet updated:", response.data);
        alert("Outlet berhasil diperbarui!");
      } else {
        const response = await axios.post(`${baseUrl}/outlets`, formPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Outlet created:", response.data);
        alert("Outlet berhasil dibuat!");
      }

      navigate("/admin-outlets");
    } catch (err) {
      console.error("Gagal menyimpan outlet:", err);
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Terjadi kesalahan saat menyimpan outlet.");
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
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo.svg"
            alt="Company Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        <h1 className="text-xl font-bold text-center mb-4">
          {id ? "Edit Outlet" : "Create Outlet"}
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

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-md p-2 h-20"
            required
          />
        </div>

        {/* Province - Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Province</label>
          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Select Province --</option>
            {provinces.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>

        {/* Open Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Open Hours
          </label>
          <input
            name="openHours"
            value={formData.openHours}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="e.g. 09:00 - 21:00"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="+628123456789"
          />
        </div>

        {/* Map URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Map URL</label>
          <textarea
            name="mapUrl"
            value={formData.mapUrl}
            onChange={handleChange}
            className="w-full border rounded-md p-2 h-20"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Masukkan embed Google Maps (iframe src).
          </p>
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-sm font-small text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border rounded-md p-2"
          />
          {preview && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="max-h-40 rounded-md border"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin-outlets")}
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

export default OutletForm;

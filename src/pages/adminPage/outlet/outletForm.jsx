import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OutletForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    province: "",
    open_hours: "",
    phone: "",
    map_url: "",
    image: "" // sekarang akan menyimpan Base64 string hasil upload
  });

  useEffect(() => {
    if (id) {
      // ===== Edit Mode =====
      fetch("/data/outlets.json")
        .then((res) => res.json())
        .then((data) => {
          const found = data.data.find((o) => String(o.id) === id);
          if (found) setFormData(found);
        });
    } else {
      // ===== Create Mode =====
      const newId = Date.now();
      setFormData((prev) => ({ ...prev, id: newId.toString() }));
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

    // Validasi ukuran / tipe file (opsional)
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result })); // Base64
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      alert(`Outlet updated! (ID: ${formData.id})`);
    } else {
      alert(`Outlet created! (ID: ${formData.id})`);
    }
    navigate("/admin/outlets");
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
              ID generated automatically
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

        {/* Province */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Province</label>
          <input
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Open Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Open Hours
          </label>
          <input
            name="open_hours"
            value={formData.open_hours}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="e.g. 09:00 - 21:00"
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
            name="map_url"
            value={formData.map_url}
            onChange={handleChange}
            className="w-full border rounded-md p-2 h-20"
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
          {formData.image && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Preview:</p>
              <img
                src={formData.image}
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
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            {id ? "Save Changes" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OutletForm;

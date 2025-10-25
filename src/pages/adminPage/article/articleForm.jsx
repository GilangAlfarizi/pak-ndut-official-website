import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";

const ArticleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null, // simpan File object di sini
  });

  const [preview, setPreview] = useState(null); // untuk preview image

  // ===== Load existing article if editing =====
  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/articles`)
        .then((res) => res.json())
        .then((data) => {
          const found = data.data.find((o) => String(o.id) === id);
          if (found)
            setFormData({
              title: found.title || "",
              content: found.content || "",
              image: null,
            });
          if (found?.image) setPreview(found.image);
        })
        .catch((err) => console.error("Error loading article:", err));
    }
  }, [id]);

  // ===== Handlers =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file)); // tampilkan preview
  };

  // ===== Submit (Create or Update) =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda belum login. Silakan login terlebih dahulu.");
      navigate("/admin-login");
      return;
    }

    try {
      // Buat FormData
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("content", formData.content);
      if (formData.image) formPayload.append("image", formData.image);

      console.log("Data dikirim ke API (FormData):", Object.fromEntries(formPayload));

      if (id) {
        // ===== Update Mode =====
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/articles/${id}`,
          formPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response:", response.data);
        alert("Artikel berhasil diperbarui!");
      } else {
        // ===== Create Mode =====
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/articles`,
          formPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response:", response.data);
        alert("Artikel berhasil dibuat!");
      }

      navigate("/admin-articles");
    } catch (error) {
      console.error("Gagal menyimpan artikel:", error);
      console.error("Detail error:", error.response?.data);
      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan artikel."
      );
    }
  };

  // ===== UI =====
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl space-y-4"
        encType="multipart/form-data"
      >
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo.svg"
            alt="Company Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        <h1 className="text-xl font-bold text-center mb-4">
          {id ? "Edit Article" : "Create Article"}
        </h1>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleContentChange}
            className="h-40 mb-12"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
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
            onClick={() => navigate("/admin-articles")}
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

export default ArticleForm;

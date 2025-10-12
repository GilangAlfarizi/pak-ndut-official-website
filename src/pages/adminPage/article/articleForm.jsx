import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const ArticleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    date: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      // ===== Edit Mode =====
      fetch("/data/articles.json")
        .then((res) => res.json())
        .then((data) => {
          const found = data.data.find((o) => String(o.id) === id);
          if (found) setFormData(found);
        });
    } else {
      // ===== Create Mode =====
      const newId = Date.now();
      const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
      setFormData((prev) => ({
        ...prev,
        id: newId.toString(),
        date: today,
      }));
    }
  }, [id]);

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

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      alert(`Article updated! (ID: ${formData.id})`);
    } else {
      alert(`Article created! (ID: ${formData.id})`);
    }
    navigate("/admin/articles");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl space-y-4"
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

        {/* ID */}

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

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        {/* Content pakai ReactQuill-New */}
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

        {/* Upload Image */}
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

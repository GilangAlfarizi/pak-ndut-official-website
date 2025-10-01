import { useEffect, useState, useMemo } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/adminCompenents/Sidebar";

// 🔹 Modal Detail
const DetailModal = ({ article, onClose }) => {
  if (!article) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Article Detail</h2>
        <div className="space-y-3 text-gray-700">
          <div><p className="font-semibold">ID:</p><p>{article.id}</p></div>
          <div><p className="font-semibold">Title:</p><p>{article.title}</p></div>
          <div><p className="font-semibold">Date:</p><p>{article.date}</p></div>
          <div><p className="font-semibold">Content:</p><p>{article.content}</p></div>
          {article.image && (
            <div>
              <p className="font-semibold mb-1">Image:</p>
              <img
                src={article.image}
                alt={article.title}
                className="w-full rounded-md border"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTitle, setSearchTitle] = useState(""); // search input
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // 🔹 Fetch Data
  useEffect(() => {
    fetch("/data/articles.json")
      .then((res) => res.json())
      .then((data) => setArticles(Array.isArray(data?.data) ? data.data : []))
      .catch((err) => console.error("Failed to load articles:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // 🔎 Filtering (search title)
  const filteredArticles = useMemo(() => {
    return articles.filter((a) =>
      a.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  }, [articles, searchTitle]);

  // 📑 Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Reset page saat search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTitle]);

  return (
    <Sidebar>
      <div className="p-6 bg-gray-50 min-h-screen relative w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Articles Management</h1>
          <button
            onClick={() => navigate("/admin-articles/new")}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
          >
            <FaPlus /> Add Article
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* 🔎 Search Title */}
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Search article title..."
            className="border p-2 rounded-md w-full md:w-1/3"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((article) => (
                  <tr key={article.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{article.id}</td>
                    <td className="py-3 px-4">{article.title}</td>
                    <td className="py-3 px-4">{article.date}</td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="inline-flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-md"
                      >
                        <FaEye /> Detail
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin-articles/edit/${article.id}`)
                        }
                        className="inline-flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === i + 1
                    ? "bg-red-600 text-white border-red-600"
                    : "hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Detail Modal */}
        {selectedArticle && (
          <DetailModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </div>
    </Sidebar>
  );
};

export default AdminArticles;

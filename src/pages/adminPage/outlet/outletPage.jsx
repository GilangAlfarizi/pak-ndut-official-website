import { useEffect, useState, useMemo } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/adminCompenents/Sidebar";

// 🔹 Modal Detail
const DetailModal = ({ outlet, onClose }) => {
  if (!outlet) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Outlet Detail</h2>
        <div className="space-y-3 text-gray-700">
          <div><p className="font-semibold">ID:</p><p>{outlet.id}</p></div>
          <div><p className="font-semibold">Name:</p><p>{outlet.name}</p></div>
          <div><p className="font-semibold">Address:</p><p>{outlet.address}</p></div>
          <div><p className="font-semibold">Province:</p><p>{outlet.province}</p></div>
          <div><p className="font-semibold">Open Hours:</p><p>{outlet.open_hours}</p></div>
          <div><p className="font-semibold">Phone:</p><p>{outlet.phone}</p></div>
          <div className="space-y-2">
            <p className="font-semibold">Map:</p>
            <iframe
              src={outlet.mapUrl}
              title="Outlet Map"
              className="w-full h-64 rounded-md border"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div>
            <p className="font-semibold mb-1">Image:</p>
            <img
              src={outlet.image}
              alt={outlet.name}
              className="w-full rounded-md border"
            />
          </div>
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

const AdminOutlets = () => {
  const [outlets, setOutlets] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [searchName, setSearchName] = useState("");      // 🔹 Search input
  const [filterProvince, setFilterProvince] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🔹 Fetch Data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/outlets`)
      .then((res) => res.json())
      .then((data) => setOutlets(Array.isArray(data?.data) ? data.data : []))
      .catch((err) => console.error("Failed to load outlets:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this outlet?")) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/outlets/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to delete outlet");
        setOutlets((prev) => prev.filter((o) => o.id !== id));
        alert(`Outlet deleted successfully.`);
      } catch (err) {
        alert("Failed to delete outlet. Please try again.");
        console.error(err);
      }
    }
  };

  // 🔎 Province Options
  const provinceOptions = useMemo(
    () => Array.from(new Set(outlets.map((o) => o.province))).sort(),
    [outlets]
  );

  // 🔎 Filtering (search + province)
  const filteredOutlets = useMemo(() => {
    return outlets.filter(
      (o) =>
        o.name.toLowerCase().includes(searchName.toLowerCase()) &&
        (filterProvince === "" || o.province === filterProvince)
    );
  }, [outlets, searchName, filterProvince]);

  // 📑 Pagination
  const totalPages = Math.ceil(filteredOutlets.length / itemsPerPage);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOutlets.slice(start, start + itemsPerPage);
  }, [filteredOutlets, currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Reset page saat filter/search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchName, filterProvince]);

  return (
    <Sidebar>
      <div className="p-6 bg-gray-50 min-h-screen relative w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Outlets Management</h1>
          <button
            onClick={() => navigate("/admin-outlets/new")}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
          >
            <FaPlus /> Add Outlet
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* 🔎 Search Name */}
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search outlet name..."
            className="border p-2 rounded-md w-full md:w-1/3"
          />

          {/* 🔎 Province Dropdown */}
          <select
            value={filterProvince}
            onChange={(e) => setFilterProvince(e.target.value)}
            className="border p-2 rounded-md w-full md:w-1/3"
          >
            <option value="">All Provinces</option>
            {provinceOptions.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Province</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((outlet) => (
                  <tr key={outlet.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{outlet.id}</td>
                    <td className="py-3 px-4">{outlet.name}</td>
                    <td className="py-3 px-4">{outlet.province}</td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <button
                        onClick={() => setSelectedOutlet(outlet)}
                        className="inline-flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-md"
                      >
                        <FaEye /> Detail
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin-outlets/edit/${outlet.id}`)
                        }
                        className="inline-flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(outlet.id)}
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
                    No outlets found.
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
        {selectedOutlet && (
          <DetailModal
            outlet={selectedOutlet}
            onClose={() => setSelectedOutlet(null)}
          />
        )}
      </div>
    </Sidebar>
  );
};

export default AdminOutlets;

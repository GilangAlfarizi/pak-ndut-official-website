import { useEffect, useState, useMemo } from "react";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/adminCompenents/Sidebar";

// 🔹 Modal Detail
const DetailModal = ({ career, onClose }) => {
  if (!career) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Career Detail</h2>

        <div className="space-y-4 text-gray-700">
          <div><p className="font-semibold">ID:</p><p>{career.id}</p></div>
          <div><p className="font-semibold">Name:</p><p>{career.name}</p></div>
          <div><p className="font-semibold">Location:</p><p>{career.location}</p></div>
          <div><p className="font-semibold">Age:</p><p>{career.age}</p></div>
          <div><p className="font-semibold">Description:</p><p>{career.description}</p></div>
          <div>
            <p className="font-semibold">Requirements:</p>
            <ul className="list-disc list-inside space-y-1">
              {career.requirement?.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
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

const AdminCareers = () => {
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [filterName, setFilterName] = useState("");     // dropdown Name
  const [filterLocation, setFilterLocation] = useState(""); // dropdown Location
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/careers`)
      .then((res) => res.json())
      .then((data) => setCareers(Array.isArray(data?.data) ? data.data : []))
      .catch((err) => console.error("Failed to load careers:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this career?")) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/careers/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to delete career");
        setCareers((prev) => prev.filter((o) => o.id !== id));
        alert(`career deleted successfully.`);
      } catch (err) {
        alert("Failed to delete career. Please try again.");
        console.error(err);
      }
    }
  };

  // 🔎 Ambil opsi unik untuk dropdown
  const nameOptions = useMemo(
    () => Array.from(new Set(careers.map((c) => c.name))).sort(),
    [careers]
  );
  const locationOptions = useMemo(
    () => Array.from(new Set(careers.map((c) => c.location))).sort(),
    [careers]
  );

  // 🔎 Filtering
  const filteredCareers = useMemo(() => {
    return careers.filter((c) =>
      (filterName === "" || c.name === filterName) &&
      (filterLocation === "" || c.location === filterLocation)
    );
  }, [careers, filterName, filterLocation]);

  // 📑 Pagination
  const totalPages = Math.ceil(filteredCareers.length / itemsPerPage);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCareers.slice(start, start + itemsPerPage);
  }, [filteredCareers, currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // reset halaman ke 1 jika filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [filterName, filterLocation]);

  return (
    <Sidebar>
      <div className="p-6 bg-gray-50 min-h-screen relative w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Careers Management</h1>
          <button
            onClick={() => navigate("/admin-careers/new")}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
          >
            <FaPlus /> Add Career
          </button>
        </div>

        {/* 🔎 Dropdown Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="border p-2 rounded-md w-full md:w-1/3"
          >
            <option value="">All Names</option>
            {nameOptions.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="border p-2 rounded-md w-full md:w-1/3"
          >
            <option value="">All Locations</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
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
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((career) => (
                  <tr key={career.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{career.id}</td>
                    <td className="py-3 px-4">{career.name}</td>
                    <td className="py-3 px-4">{career.location}</td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <button
                        onClick={() => setSelectedCareer(career)}
                        className="inline-flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-md"
                      >
                        <FaEye /> Detail
                      </button>
                      <button
                        onClick={() => navigate(`/admin-careers/edit/${career.id}`)}
                        className="inline-flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(career.id)}
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
                    No careers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 📑 Pagination Controls */}
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
        {selectedCareer && (
          <DetailModal
            career={selectedCareer}
            onClose={() => setSelectedCareer(null)}
          />
        )}
      </div>
    </Sidebar>
  );
};

export default AdminCareers;

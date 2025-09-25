import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// 🔹 Modal Detail dengan efek overlay
const DetailModal = ({ career, onClose }) => {
  if (!career) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/40 backdrop-blur-sm animate-fadeIn"
    >
      {/* Box Modal */}
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xl 
                   max-h-[90vh] overflow-y-auto transform animate-slideUp"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Career Detail</h2>

        <div className="space-y-4 text-gray-700">
          <div>
            <p className="font-semibold">ID:</p>
            <p>{career.id}</p>
          </div>
          <div>
            <p className="font-semibold">Name:</p>
            <p>{career.name}</p>
          </div>
          <div>
            <p className="font-semibold">Location:</p>
            <p>{career.location}</p>
          </div>
          <div>
            <p className="font-semibold">Age:</p>
            <p>{career.age}</p>
          </div>
          <div>
            <p className="font-semibold">Description:</p>
            <p>{career.description}</p>
          </div>
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
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/careers.json")
      .then((res) => res.json())
      .then((data) => setCareers(Array.isArray(data?.data) ? data.data : []))
      .catch((err) => console.error("Failed to load careers:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this career?")) {
      // TODO: proses delete ke backend
      setCareers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleDetail = (career) => {
    setSelectedCareer(career);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Careers Management</h1>
        <button
          onClick={() => navigate("/admin-careers/newcareer")}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition"
        >
          <FaPlus /> Add Career
        </button>
      </div>

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
            {careers.length > 0 ? (
              careers.map((career) => (
                <tr
                  key={career.id}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-3 px-4">{career.id}</td>
                  <td className="py-3 px-4">{career.name}</td>
                  <td className="py-3 px-4">{career.location}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleDetail(career)}
                      className="inline-flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-md"
                    >
                      <FaEye /> Detail
                    </button>
                    <button
                      onClick={() => navigate(`/admin/careers/edit/${career.id}`)}
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
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No careers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail */}
      {selectedCareer && (
        <DetailModal
          career={selectedCareer}
          onClose={() => setSelectedCareer(null)}
        />
      )}
    </div>
  );
};

export default AdminCareers;

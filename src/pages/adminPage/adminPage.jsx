import { Link } from "react-router-dom";
import Sidebar from "../../components/adminCompenents/Sidebar";
import { useEffect, useState } from "react";

const AdminPage = () => {
  // const token = localStorage.getItem("token");
  const [counts, setCounts] = useState({ articles: 0, outlets: 0, careers: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let mounted = true;

    const normalizeBase = (raw) => {
      if (!raw) return "";
      return String(raw).replace(/\/+$/, "");
    };

    const getCount = (data) => {
      // Robustly handle common API shapes:
      // - arrays (response is list)
      // - { count: N } or { total: N }
      // - { data: [...] } or { results: [...] } or { items: [...] } or { rows: [...] }
      // - nested arrays on first found property
      if (data == null) return 0;
      if (Array.isArray(data)) return data.length;
      if (typeof data === "object") {
        if ("count" in data) return Number(data.count) || 0;
        if ("total" in data) return Number(data.total) || 0;
        if ("results" in data && Array.isArray(data.results))
          return data.results.length;
        if ("data" in data && Array.isArray(data.data)) return data.data.length;
        if ("items" in data && Array.isArray(data.items))
          return data.items.length;
        if ("rows" in data && Array.isArray(data.rows)) return data.rows.length;
        if ("length" in data && typeof data.length === "number")
          return data.length;
        // Try to find the first array or numeric-looking count property
        const keys = Object.keys(data);
        for (const k of keys) {
          if (Array.isArray(data[k])) return data[k].length;
          const lower = k.toLowerCase();
          if (
            (lower.includes("count") || lower.includes("total")) &&
            typeof data[k] === "number"
          ) {
            return Number(data[k]) || 0;
          }
        }
        return 0;
      }
      const n = Number(data);
      return Number.isFinite(n) ? n : 0;
    };

    const fetchCounts = async () => {
      try {
        setLoading(true);
        setError(null);
        const rawBase = import.meta.env.VITE_API_URL || "";
        const base = normalizeBase(rawBase);
        const endpoints = ["articles", "outlets", "careers"];
        const responses = await Promise.all(
          endpoints.map((ep) => fetch(`${base}/${ep}`, { signal }))
        );

        // Check responses and parse JSON
        const jsons = await Promise.all(
          responses.map((r) => {
            if (!r.ok) throw new Error(`Failed to fetch ${r.url}: ${r.status}`);
            return r.json();
          })
        );

        if (mounted) {
          setCounts({
            articles: getCount(jsons[0]),
            outlets: getCount(jsons[1]),
            careers: getCount(jsons[2]),
          });
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to load counts:", err);
          if (mounted) setError("Failed to load counts");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCounts();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return (
    <Sidebar>
      <div className="flex-col w-full">
        <div className="flex w-full bg-[#BA0202] h-40 items-center px-6">
          <h2 className="text-white text-2xl font-semibold">Pak Ndut Admin Dashboard</h2>
        </div>

        {loading ? (
          <div className="p-6 flex items-center justify-center">
            <div
              className="p-6 flex items-center space-x-3"
              role="status"
              aria-live="polite"
            >
              <svg
                className="animate-spin h-8 w-8 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span className="text-gray-700">Loading counts…</span>
            </div>
          </div>
        ) : error ? (
          <div className="p-6">
            <div className="bg-red-50 text-red-700 rounded-lg shadow p-6">
              {error}
            </div>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            <Link to="/admin-outlets" className="no-underline">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between hover:bg-gray-300">
              <div className="text-2xl">Outlets</div>
              <div className="mt-4 text-3xl font-bold text-gray-900">
                {counts.outlets}
              </div>
            </div>
            </Link>

            <Link to="/admin-careers" className="no-underline">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between hover:bg-gray-300">
              <div className="text-2xl">Careers</div>
              <div className="mt-4 text-3xl font-bold text-gray-900">
                {counts.careers}
              </div>
            </div>
            </Link>

            <Link to="/admin-articles" className="no-underline">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between hover:bg-gray-300">
              <div className="text-2xl">Articles</div>
              <div className="mt-4 text-3xl font-bold text-gray-900">
                {counts.articles}
              </div>
            </div>
            </Link>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default AdminPage;

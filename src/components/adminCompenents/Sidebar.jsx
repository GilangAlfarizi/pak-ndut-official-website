const Sidebar = (props) => {
  const handleLogout = () => {
    // Hapus token atau data user dari localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // kalau kamu simpan token juga

    // (Opsional) bersihkan cookie jika kamu pakai cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Redirect ke halaman login
    window.location.href = "/admin-login";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/admin"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/admin-outlets"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Outlets</span>
              </a>
            </li>
            <li>
              <a
                href="/admin-careers"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Careers</span>
              </a>
            </li>
            <li>
              <a
                href="/admin-articles"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Articles</span>
              </a>
            </li>
            <li>
              {/* Tombol Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="shrink-0 w-5 h-5 text-red-500 transition duration-75 group-hover:text-red-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-red-600 font-semibold">
                  Log out
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Konten utama */}
      {props.children}
    </div>
  );
};

export default Sidebar;
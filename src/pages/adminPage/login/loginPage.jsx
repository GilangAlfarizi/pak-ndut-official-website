import { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState(""); // email/username input
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/data/account.json");
      const json = await res.json();
      const accounts = json.data || [];

      // Cari user yang sesuai (username bisa email)
      const foundUser = accounts.find(
        (acc) =>
          acc.email.toLowerCase() === username.toLowerCase() &&
          acc.password === password
      );

      if (foundUser) {
        // ✅ Login sukses
        alert(`Welcome, ${foundUser.email}!`);
        // contoh: simpan ke localStorage
        localStorage.setItem("user", JSON.stringify(foundUser));
        // redirect ke halaman admin / dashboard
        window.location.href = "/admin"; 
      } else {
        setError("Username atau password salah.");
      }
    } catch (err) {
      console.error("Failed to fetch accounts:", err);
      setError("Terjadi kesalahan server.");
    }
  };

  return (
    <div className="flex w-full h-[100vh] bg-white justify-center items-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* 🔹 Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="/images/logo.svg" // pastikan path logo benar
              alt="Pak Ndut Logo"
              className="w-auto h-16 object-contain"
            />
          </div>

          <h5 className="text-xl font-medium text-gray-900 text-center">
            Sign in to Pak Ndut
          </h5>

          {error && (
            <p className="text-red-600 text-center text-sm">{error}</p>
          )}

          {/* Username / Email */}
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="email@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full text-white bg-[#BA0202] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

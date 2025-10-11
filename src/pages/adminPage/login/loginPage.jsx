import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 🔹 Kirim request ke backend
      const response = await axios.post(
        "https://pak-ndut-backend-production.up.railway.app/users/login",
        {
          username: username,
          password: password,
        }
      );

      const userData = response?.data?.data;

      if (userData) {
        // ✅ Simpan token dan data user ke localStorage
        const token = userData.accessToken;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        alert(`Welcome, ${username}!`);
        window.location.href = "/admin";
      } else {
        setError("Login gagal: data pengguna tidak ditemukan.");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        const status = error.response.status;

        if (status === 400 || status === 404) {
          setError("Username atau password tidak valid.");
        } else if (status === 401) {
          setError("Autentikasi gagal, periksa kredensial Anda.");
        } else {
          setError("Terjadi kesalahan server.");
        }
      } else {
        setError("Gagal terhubung ke server.");
      }
    }
  };

  return (
    <div className="flex w-full h-[100vh] bg-white justify-center items-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* 🔹 Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="/images/logo.svg"
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

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="username"
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

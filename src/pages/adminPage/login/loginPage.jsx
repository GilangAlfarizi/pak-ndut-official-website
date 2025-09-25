const LoginPage = () => {
  return (
    <div className="flex w-full h-[100vh] bg-[#BA0202] justify-center items-center">
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 ">
        <form class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900 ">
            Sign in to Pak Ndut 
          </h5>
          <div>
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="username"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              required
            />
          </div>
          <button
            type="submit"
            class="w-full text-white bg-[#BA0202] focus:ring-4 focus:outline-none focus:gray font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

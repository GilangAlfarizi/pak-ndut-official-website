import Logo from "../../../public/images/logo.svg";

const Footer = () => {
  return (
    <footer class="bg-white">
      <div class="mx-auto w-full max-w-screen-xl">
        <div class="gap-8 px-4 py-6 lg:py-8 justify-between lg:flex">
          <div class="place-content-center py-8">
            <div class="flex justify-center">
              <img src={Logo} />
            </div>
          </div>
          <div class="grid gap-8 grid-cols-2 text-center lg:text-left">
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                About
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <a href="#" class=" hover:underline">
                    Our Profile
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    Vision & Mission
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    Article
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Opportunities
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <a href="#" class="hover:underline">
                    Franchise
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    Join Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

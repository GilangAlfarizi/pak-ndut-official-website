import Logo from "../../../public/images/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="gap-8 px-4 py-6 lg:py-8 justify-between lg:flex">
          <div className="place-content-center py-8">
            <div className="flex justify-center">
              <img src={Logo} />
            </div>
          </div>
          <div className="grid gap-8 grid-cols-2 text-center lg:text-left">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                About
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <a href="#" className=" hover:underline">
                    Our Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Vision & Mission
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Article
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Opportunities
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <a href="#" className="hover:underline">
                    Franchise
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
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

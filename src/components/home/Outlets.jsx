import GIF from "../../../public/images/Pak_Ndut_Lokasi_Cabang_Outlet[1].gif";
import AccordionOutlet from "../global/AccordionOutlet";


const Outlets = () => {
  const accordionData = [
    {
      id: 1,
      question: "What is Flowbite?",
      answer: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is an open-source library of interactive components built
            on top of Tailwind CSS including buttons, dropdowns, modals,
            navbars, and more.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out this guide to learn how to{" "}
            <a
              href="/docs/getting-started/introduction/"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              get started
            </a>{" "}
            and start developing websites even faster.
          </p>
        </>
      ),
    },
    {
      id: 2,
      question: "Is there a Figma file available?",
      answer: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is first conceptualized and designed using the Figma
            software.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the{" "}
            <a
              href="https://flowbite.com/figma/"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Figma design system
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 3,
      question: "Is there a Figma file available?",
      answer: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is first conceptualized and designed using the Figma
            software.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the{" "}
            <a
              href="https://flowbite.com/figma/"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Figma design system
            </a>
            .
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="bg-[#BA0202] p-4 md:p-12 2xl:p-20 2xl:px-63 xl:px-32 lg:px-28 w-[100v]">
      <div className="bg-white rounded-4xl">
        <div className="p-4 xl:p-20 ">
          <h2 className="text-4xl font-black text-center text-[#BA0202]">
            Our Outlets
          </h2>
          <img src={GIF} alt="GIF" className="rounded-4xl mt-8" />
        </div>
        <div className="flex bg-[#FFCC29] h-80 p-8 justify-center">
          <div className=" w-240 flex">
            <div className="flex  w-full h-full justify-center items-center">
              <div className="text-center text-[#BA0202]">
                <h4 className="text-8xl font-bold">29</h4>
                <p className="font-bold">Outlets</p>
              </div>
            </div>
            <div className="flex  w-full h-full justify-center items-center">
              <div className="text-center text-[#BA0202]">
                <h4 className="text-8xl font-bold">6</h4>
                <p className="font-bold">Cities</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 xl:p-20"><AccordionOutlet items={accordionData}/></div>
      </div>
    </div>
  );
};

export default Outlets;


import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext"; // 🔑 ambil bahasa global

const AccordionOutlet = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const { language } = useLanguage(); // 🔑 toggle bahasa global

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 🔑 Translation dictionary
  const translations = {
    en: {
      address: "Address",
      openHours: "Open Hours",
      contactNumber: "Contact Number",
    },
    id: {
      address: "Alamat",
      openHours: "Jam Buka",
      contactNumber: "Nomor Kontak",
    },
  };

  return (
    <div
      id="accordion-flush"
      className="divide-y divide-gray-200 dark:divide-gray-700"
    >
      {items.map((provinceItem, index) => (
        <div key={provinceItem.id}>
          <h2 id={`accordion-heading-${provinceItem.id}`}>
            <button
              type="button"
              onClick={() => toggleAccordion(index)}
              className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b dark:border-gray-700 dark:text-gray-400 gap-3"
              aria-expanded={openIndex === index}
              aria-controls={`accordion-body-${provinceItem.id}`}
            >
              <p className="text-black">{provinceItem.province}</p>
              <svg
                className={`w-3 h-3 transform transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 10 6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>

          <div
            id={`accordion-body-${provinceItem.id}`}
            className={`${openIndex === index ? "block" : "hidden"}`}
            aria-labelledby={`accordion-heading-${provinceItem.id}`}
          >
            {provinceItem.outlets.map((outlet) => (
              <div key={outlet.id} className="py-5">
                <div className="md:flex gap-4">
                  {/* Map iframe */}
                  <div className="w-full md:w-1/2 aspect-[4/3]">
                    <iframe
                      src={outlet.map_url}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    ></iframe>
                  </div>

                  {/* Outlet info */}
                  <div className="md:w-1/2 text-sm space-y-2">
                    <div>
                      <p className="font-bold text-2xl">{outlet.name}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-xl">
                        {translations[language].address}
                      </p>
                      <p>{outlet.address}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-xl">
                        {translations[language].openHours}
                      </p>
                      <p>{outlet.open_hours}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-xl">
                        {translations[language].contactNumber}
                      </p>
                      <p>{outlet.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionOutlet;

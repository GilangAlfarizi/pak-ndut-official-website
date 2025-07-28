import { useState } from "react";

const AccordionOutlet = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="accordion-flush"
      className="divide-y divide-gray-200 dark:divide-gray-700"
    >
      {items.map((item, index) => (
        <div key={item.id}>
          <h2 id={`accordion-heading-${item.id}`}>
            <button
              type="button"
              onClick={() => toggleAccordion(index)}
              className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b dark:border-gray-700 dark:text-gray-400 gap-3"
              aria-expanded={openIndex === index}
              aria-controls={`accordion-body-${item.id}`}
            >
              <span>{item.question}</span>
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
            id={`accordion-body-${item.id}`}
            className={`${openIndex === index ? "block" : "hidden"}`}
            aria-labelledby={`accordion-heading-${item.id}`}
          >
            <div className="py-5 border-b border-gray-200 dark:border-gray-700">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionOutlet;

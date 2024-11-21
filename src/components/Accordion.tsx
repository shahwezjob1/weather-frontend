import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import WeatherCards from "./WeatherCards";
import { ForecastDetails } from "../utils/Types";

// Accordion Item Component
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
  onToggle,
}) => (
  <div className="border-b rounded-b-md border-blue-300">
    <button
      className="w-full flex justify-between text-left px-4 py-2 text-sm sm:text-base bg-blue-300 hover:bg-blue-400 text-white font-semibold focus:outline-none rounded-tl-lg rounded-br-lg rounded-tr-none rounded-bl-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${title}`}
      id={`accordion-button-${title}`}
      type="button"
    >
      {title}
      <AiOutlineDown
        className={`transform transition-transform self-center ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
        style={{ transition: "transform 0.3s ease" }}
        aria-hidden="true"
      />
    </button>
    <div
      id={`accordion-content-${title}`}
      role="region"
      aria-labelledby={`accordion-button-${title}`}
      className={`px-4 py-2 flex flex-row gap-3 overflow-x-auto sm:overflow-x-hidden w-full text-gray-700 text-xs sm:text-sm border-x-2 rounded-b-md border-blue-400 border-dashed ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  </div>
);

// Accordion Component
interface AccordionProps {
  forecast: ForecastDetails[];
}

const Accordion: React.FC<AccordionProps> = ({ forecast }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getDayOfWeek = (dateString: string | number | Date) => {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    return inputDate.toDateString() === currentDate.toDateString()
      ? "Today's Weather"
      : `${inputDate.toLocaleString("en-us", { weekday: "long" })}'s Weather`;
  };

  const filteredForecast = forecast.slice(0, 4);

  return (
    <div className="mt-10">
      {filteredForecast.map((ele: ForecastDetails, ind: number) => (
        <AccordionItem
          title={getDayOfWeek(ele.date)}
          isOpen={openIndex === ind}
          onToggle={() => handleToggle(ind)}
          key={`accordion-item-${ind}`}
        >
          {ele.steps.map((step, index) => (
            <WeatherCards key={`Weather-cards-${index}`} {...step} />
          ))}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;

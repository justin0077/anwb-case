import { motion } from "framer-motion";
import { ChangeEvent, FormEvent } from "react";

// Hier definieer ik de Search Properties die vanuit het Weather component wordt meegegeven
interface SearchProps {
  location: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Search: React.FC<SearchProps> = ({
  location,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <form className="weather__form" onSubmit={handleSubmit}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="relative text-gray-600 focus-within:text-gray-400"
      >
        <span className="absolute inset-y-0 left-2 flex items-center pl-2">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </span>
        <input
          type="search"
          value={location}
          name="q"
          className="weather__form-input py-2 text-md  pl-12 focus:outline-none focus:bg-white focus:text-gray-900"
          placeholder="Zoek op plaats..."
          onChange={handleInputChange}
        />
      </motion.div>
      <motion.button
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeIn" }}
        className="weather__form-button"
        type="submit"
      >
        Zoeken
      </motion.button>
    </form>
  );
};

export default Search;

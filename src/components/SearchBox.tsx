import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  ENTER_STRING_ONLY_ERROR_MSG,
  ENTER_THREEE_LETTERS_ERROR_MSG,
} from "../utils/constants";

interface SearchProps {
  handleChangeCity: (name: string) => void;
}

const SearchBox: React.FC<SearchProps> = ({ handleChangeCity }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length < 3) {
      setError(ENTER_THREEE_LETTERS_ERROR_MSG);
      return;
    }
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(trimmedQuery)) {
      setError(ENTER_STRING_ONLY_ERROR_MSG);
      return;
    }
    setError("");
    handleChangeCity(trimmedQuery);
  };

  return (
    <div className="w-max" id="searchBox">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Search city"
          className="text-sm py-2 pl-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch
          onClick={handleSearchClick}
          aria-label="Search"
          tabIndex={0}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        />
      </div>
      {error && (
        <p className="text-white text-sm absolute">
          <span className="text-red-500">*</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default SearchBox;

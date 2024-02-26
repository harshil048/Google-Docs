import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";

const DocumentSearchbar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`${
        isFocused ? "bg-white shadow-xl" : "bg-gray-100 "
      } w-full max-w-2xl  rounded-md h-12 flex items-center text-gray-500 mr-4`}
    >
      <div className="flex justify-center px-4 rounded-xl">
        <SearchIcon className="h-4 w-4"></SearchIcon>
      </div>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type="text"
        className={`${
          isFocused ? "bg-white" : "bg-gray-100"
        } w-full h-full rounded-xl pr-4 font-medium outline-none`}
        placeholder="Search"
        name=""
        id=""
      ></input>
    </div>
  );
};

export default DocumentSearchbar;

"use client";
import { Search, X } from "lucide-react";
import React, { useState } from "react";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="w-full hidden md:inline-flex flex-1 h-12 relative">
        <Search className="text-lg absolute left-2 mt-3.5 text-blueViolet size-5" />
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 h-full border-gray-400 outline-none bg-transparent placeholder-lightText border-[1px] border-accent/30  rounded-sm pl-8 pr-28"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {search && (
          <X
            onClick={() => setSearch("")}
            className="text-blueViolet hover:text-blueviolet hoverEffect cursor-pointer absolute right-20 top-4 size-5"
          />
        )}
        <button className="bg-blueViolet text-accentWhite absolute right-0 px-3.5 py-1.5 mr-1.5 text-sm hover:bg-darkblueViolet hoverEffect font-medium top-2">
          search
        </button>
      </div>
    </>
  );
};

export default SearchInput;

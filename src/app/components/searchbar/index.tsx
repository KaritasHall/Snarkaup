"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { SearchIcon } from "../icons";
import { useState } from "react";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const [isActive, setIsActive] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  // Navigate to search page when user presses enter
  function goToSearchPage() {
    replace(`/search?query=${searchParams.get("query")}`);
  }

  console.log("isActive", isActive);
  return (
    <div className="relative flex h-full w-full items-center">
      <div className="mr-[34px] h-full w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>

        <input
          className={`mr-[34px] h-[36px] w-full rounded-md border border-black04 py-[9px] pl-10 pt-8 text-sm placeholder:text-black04
        ${isActive ? "block" : "invisible"} `}
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              goToSearchPage();
              console.log("Enter");
            }
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>

      <button
        className="absolute right-0"
        onClick={() => setIsActive(!isActive)}
      >
        <SearchIcon />
      </button>
    </div>
  );
}

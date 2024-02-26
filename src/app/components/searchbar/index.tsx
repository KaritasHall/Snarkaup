"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { SearchIcon } from "../icons";

interface SearchBarProps {
  placeholder: string;
  className?: string;
}

export default function SearchBar({ placeholder, className }: SearchBarProps) {
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

  return (
    <div className={className}>
      <div className="relative flex h-full w-full items-center">
        <div className="h-full w-full">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>
          <div className="flex items-center gap-6 rounded-lg border border-black04 p-2 pl-6 lg:p-6">
            <SearchIcon />
            <input
              className="text w-full bg-inherit text-sm outline-none placeholder:text-black04 lg:text-base"
              placeholder={placeholder}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  goToSearchPage();
                }
              }}
              defaultValue={searchParams.get("query")?.toString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useRef, useEffect, useState } from "react";
import cx from "classnames";
import { CloseButton } from "../close-button";
import SectionContainer from "../section-container";
import { useProducts } from "@/app/hooks/useProducts";
import Link from "next/link";

type MegaMenuProps = {
  isScrolling: boolean;
  closeMegaMenu: () => void;
  setHasMountedMegaMenu: (hasMounted: boolean) => void;
  hasMountedMegaMenu: boolean;
};

export const MegaMenu = ({
  isScrolling,
  closeMegaMenu,
  setHasMountedMegaMenu,
  hasMountedMegaMenu,
}: MegaMenuProps) => {
  const { categories } = useProducts({});

  const dropdownRef = useRef<HTMLDivElement>(null);

  // We need to keep track of when the component has mounted so animations can be applied
  useEffect(() => {
    setHasMountedMegaMenu(true);
  }, []);

  // Close mega menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        event.stopPropagation();
        closeMegaMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Only show the parent categories in menu
  const parentCategories = categories?.filter(
    (category) => category.parentId == null,
  );

  return (
    <>
      <div
        ref={dropdownRef}
        className={cx(
          "fadeIn fixed z-10 w-full bg-white shadow-md",
          isScrolling ? "top-[54px]" : "top-[84px]",
          hasMountedMegaMenu ? "translate-y-0" : "-translate-y-[120%]",
        )}
      >
        <SectionContainer>
          <div className="flex justify-between py-10">
            <div className="grid w-full gap-18 lg:grid-cols-3">
              {parentCategories?.map((category) => (
                <li
                  className="list-none text-base font-semibold text-black07 transition-colors duration-200 hover:text-black04"
                  key={category.id}
                >
                  <Link
                    href={`/categories/${category.title}`}
                    onClick={closeMegaMenu}
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </div>

            <CloseButton onClick={closeMegaMenu} />
          </div>
        </SectionContainer>
      </div>
    </>
  );
};

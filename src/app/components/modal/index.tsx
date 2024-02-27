"use client";
import { useHelloModal } from "@/app/hooks/useHelloModal";
import { CloseButton } from "../close-button";
import Link from "next/link";
import { GithubIcon } from "../icons";
import { useEffect, useRef } from "react";

export const Modal = () => {
  const { isModalOpen, setIsModalOpen } = useHelloModal();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    // Stop body scrolling when modal is open
    const stopBodyScrolling = (bool: boolean) => {
      if (bool) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
    };

    // Only add event listener and stop scrolling if modal is open
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      stopBodyScrolling(true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      stopBodyScrolling(false);
    };
  }, [isModalOpen, setIsModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black07 bg-opacity-50 pt-160">
      <div ref={modalRef} className="bg-modalBg rounded-md p-12">
        <div className="flex justify-end">
          <CloseButton onClick={() => setIsModalOpen(false)} />
        </div>
        <div className="flex flex-col items-center gap-24 p-10">
          <h1 className="text-modalText pb-6 text-xl">
            Thanks for visiting Snarkaup!
          </h1>
          <p className="text-modalText w-10/12 text-center text-base">
            If you'd like to see more of my work you can visit my Github profile
          </p>
          <Link
            aria-label="Go to authors Github profile"
            target="_blank"
            href="https://github.com/KaritasHall"
            className="hover:bg-modalText bg-modalBg border-modalText group flex items-center gap-8 rounded-lg border p-8"
          >
            <GithubIcon className="fill-modalText group-hover:fill-modalBg" />
            <p className="text-modalText group-hover:text-modalBg">
              KaritasHall
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

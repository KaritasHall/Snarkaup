"use client";
import Link from "next/link";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "../icons";
import { useHelloModal } from "@/app/hooks/useHelloModal";
import { Logo } from "../logo";

const Footer = () => {
  const { setIsModalOpen } = useHelloModal();

  return (
    <div className="bg-black07 px-fluid-x py-48 text-sm text-pureWhite lg:text-base">
      <footer className="flex h-fit w-full flex-col items-center gap-40 lg:gap-[57px]">
        <div className="divider flex w-full flex-col gap-40 lg:flex-row lg:justify-between lg:pb-[57px]">
          <div className="flex flex-col items-center lg:flex-row">
            <Logo />
          </div>
          <div className="flex flex-col items-center gap-[32px] pb-24 lg:flex-row">
            <Link
              aria-label="Read more about us"
              className="hover:text-grey03"
              href="/about"
            >
              <p>About us</p>
            </Link>
            <Link
              className="hover:text-grey03"
              aria-label="Email Snarkaup"
              href="mailto:snarkaup@snarkaup.is"
            >
              snarkaup@snarkaup.is
            </Link>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-32 lg:flex-row lg:justify-between">
          <div className="flex items-center gap-24">
            <button
              onClick={() => setIsModalOpen(true)}
              className="hover:text-grey03"
            >
              <InstagramIcon />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hover:text-grey03"
            >
              <FacebookIcon />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hover:text-grey03"
            >
              <YoutubeIcon />
            </button>
          </div>
          <p className="text-label lg:text-sm">© 2023 Snarkaup</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

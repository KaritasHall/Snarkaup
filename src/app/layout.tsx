import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Poppins, Inter, Raleway } from "next/font/google";
import { Modal } from "./components/modal";
import { PageWrapper } from "./components/page-wrapper";

const raleway = Raleway({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin-ext"],
  variable: "--font-raleway",
});

const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin-ext"],
  variable: "--font-poppins",
});

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Snarkaup",
  description: "Amazing!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${poppins.variable} ${inter.variable} ${raleway.variable} font-inter`}
        >
          <Navbar />
          <PageWrapper>{children}</PageWrapper>
          <Footer />
          <Modal />
        </body>
      </Providers>
    </html>
  );
}

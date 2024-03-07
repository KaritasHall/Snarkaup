import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Poppins, Inter } from "next/font/google";
import { Modal } from "./components/modal";

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
        <body className={`${poppins.variable} ${inter.variable} font-inter`}>
          <Navbar />
          {children}
          <Footer />
          <Modal />
        </body>
      </Providers>
    </html>
  );
}

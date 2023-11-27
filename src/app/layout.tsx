import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Context } from "./context";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin-ext"],
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
      <Context>
        <body className={poppins.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </Context>
    </html>
  );
}

/* eslint-disable @next/next/no-img-element */
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <div className="w-full flex flex-col items-center bg-[#EBEBEC] min-h-screen">
          <div className="w-full bg-white h-24 shadow-md flex items-center justify-center mb-16 ">
            <div className="w-11/12 relative flex flex-row items-center">
              <img
                src="/images/acmeco_logo.png"
                alt="LOGO"
                className="md:w-56"
              />
              <p className="absolute right-0 text-xl font-sans text-[#343A3E]">
                Content Management System
              </p>
            </div>
          </div>
          <div className="w-11/12 bg-[#EBEBEC] flex justify-center">{children}</div>
        </div>
      </body>
    </html>
  );
}

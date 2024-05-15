import {Inter} from "next/font/google";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import MainNavbar from "@/components/MainNavbar";
import React from "react";
import Footer from "@/components/Footer";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "ZENITH",
  description: "Online Store",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
    <body
      className={`${inter.className}`}
    >
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <div className="sticky top-0 w-full z-50">
          <MainNavbar/>
        </div>
        <div className="container mt-8 mb-24 mx-auto">
          {children}
        </div>
        <div className="bg-gradient-radial"></div>
        <div className="h-48 bg-gradient-to-t from-gray-900 to-black"></div>
        <Footer/>
      </main>
    </NextUIProvider>
    </body>
    </html>
  );
}
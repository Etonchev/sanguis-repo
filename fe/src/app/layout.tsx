import type { Metadata } from "next";
import Provider from "./provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sanguis",
  description: "Sanguis",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(twMerge(inter.className))}>
        <Provider>
          <main className="h-screen">
            <NavBar />
            <div className="h-[calc(100%-128px)] pt-24">{children}</div>
            <Footer />
            <Toaster />
          </main>
        </Provider>
      </body>
    </html>
  );
}

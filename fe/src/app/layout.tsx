import type { Metadata } from "next";
import Provider from "./provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sanguis",
  description: "Sanguis",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main>
            {children}
            <Toaster />
          </main>
        </Provider>
      </body>
    </html>
  );
}

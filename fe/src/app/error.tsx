"use client";

import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";

const Error = () => {
  return (
    <main className="h-full w-full">
      <NavBar />
      <div className="text-2xl text-center">Oops... Something whent wrong, please try again.</div>
      <Footer />
    </main>
  );
};

export default Error;

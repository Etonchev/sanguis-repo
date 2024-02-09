"use client"

import Link from "next/link";

const Footer = () => {
  return(
    <main className="shadow-[0_35px_60px_15px_rgba(0,0,0,0.5)] w-full h-16 flex justify-between items-center px-12">
      <Link href={"/"} className="text-2xl">
        SANGUIS
      </Link>
      <div>Sanguis 2024. All rights reserved.</div>
    </main>
  )
}

export default Footer;

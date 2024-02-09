"use client"

import Link from "next/link";

const Footer = () => {
  return(
    <main className="bg-slate-800 shadow-[0_35px_60px_15px_rgba(0,0,0,0.5)] w-full h-16 flex justify-between items-center px-12 mt-12">
      <Link href={"/"} className="text-2xl text-slate-50">
        SANGUIS
      </Link>
      <div className="text-slate-50">Sanguis 2024. All rights reserved.</div>
    </main>
  )
}

export default Footer;

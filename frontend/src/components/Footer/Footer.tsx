"use client";

import Link from "next/link";

const Footer = () => {
  return (
      <main className="bg-slate-800 shadow-[0_35px_60px_15px_rgba(0,0,0,0.5)] w-full h-16 flex justify-end px-12 mt-12 gap-10">
          <Link href={"https://app.swaggerhub.com/apis/tonchev/sanguis/1.0.0#/"} className="text-slate-50 self-center hover:cursor-pointer hover:text-green-500" target="_blank">
              API Specification
          </Link>
          <div className="text-slate-50 self-center">Sanguis 2024. All rights reserved.</div>
      </main>
  );
};

export default Footer;

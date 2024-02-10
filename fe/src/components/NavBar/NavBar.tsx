"use client";

import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <main className="bg-slate-800 shadow-xl w-full h-16 flex justify-between items-center px-12">
      <Link href={"/"} className="text-2xl text-slate-50">
        SANGUIS
      </Link>
      <div>
        {status === "loading" && <LoadingSkeleton />}
        {session && session.user && (
          <div className="flex gap-2">
            <Link href={"/all-tests"} className="text-lg font-semibold text-slate-50 self-center mr-8 mt-1 hover:cursor-pointer hover:text-green-500">
              MY TESTS
            </Link>
            <Avatar>
              <AvatarFallback>{`${session.user.firstName
                .charAt(0)
                .toUpperCase()}${session.user.lastName.charAt(0).toUpperCase()}`}</AvatarFallback>
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-slate-50">{`${session.user.firstName} ${session.user.lastName}`}</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/login");
                    signOut({ redirect: false });
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </main>
  );
};

export default NavBar;

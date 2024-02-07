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
    <main className="shadow-xl w-full h-16 flex justify-between items-center px-12">
      <Link href={"/"} className="text-2xl">
        SANGUIS
      </Link>
      <div>
        {status === "loading" && <LoadingSkeleton />}
        {session && session.user && (
          <div className="flex gap-2">
            <Avatar>
              <AvatarFallback>{`${session.user.firstName
                .charAt(0)
                .toUpperCase()}${session.user.lastName.charAt(0).toUpperCase()}`}</AvatarFallback>
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger>{`${session.user.firstName} ${session.user.lastName}`}</DropdownMenuTrigger>
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

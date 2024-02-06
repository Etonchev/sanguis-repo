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
import { Skeleton } from "@/components/ui/skeleton";

const NavBar = () => {
  const { data: session, status } = useSession();

  console.log(session?.user);
  return (
    <main className="shadow-xl w-full h-16 flex justify-between items-center px-12">
      <div className="text-2xl">SANGUIS</div>
      <div>
        {status === "loading" && <Skeleton className="w-[100px] h-[20px] rounded-full" />}
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
                <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
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

"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon, History, LayoutDashboard, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

const Nav = () => {
  const session = useSession();
  const isMobile = useIsMobile()

  if (!session || !session.data?.user.image) {
    return null;
  }
  return (
    <nav className="w-full h-16 bg-white/40 backdrop-blur-3xl rounded-full flex items-center justify-between text-zinc-100 sm:px-6 px-2">
      <div className="flex items-center sm:gap-4 gap-1">
        <Image
          src={session.data?.user.image}
          alt="user"
          height={isMobile ? 30 :40}
          width={isMobile ? 30 :40}
          className="rounded-full "
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-xs sm:text-2xl hover:text-zinc-500 transition-all duration-75 ease-linear">
            {session.data.user.name} <ArrowDownIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{session.data.user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{session.data.user.email}</DropdownMenuItem>
            <DropdownMenuItem>
              <Button className="text-sm">
                Log out <LogOutIcon className="size-4" />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center sm:gap-6 gap-3 p-2">
        <Link href={"/"}       className="text-sm sm:text-2xl flex items-center gap-2 hover:text-zinc-500 transition-all duration-75 ease-linear">DashBoard <LayoutDashboard className="sm:block hidden size-6"/></Link>
        <Link href={"history"} className="text-sm sm:text-2xl flex items-center gap-2 hover:text-zinc-500 transition-all duration-75 ease-linear">History <History className="sm:block hidden size-6"/></Link>
      </div>
    </nav>
  );
};

export default Nav;

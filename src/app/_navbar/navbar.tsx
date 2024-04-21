"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./navbar.scss";
import { Button } from "@/components/ui/button";
import { LogIn, Search, ShoppingCart, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { useAtom } from "jotai";
import { UserAtom } from "@/atoms";
import { Database } from "@/lib/types/database.types";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(session?.user);
      setUser(session?.user);
    };

    fetchUser();
  }, [supabase.auth]);

  if (loading) return <div></div>;

  return (
    <nav className="navbar">
      <Link href="/" className="navbar__logo">
        {/* <Image src="/image/logo.svg" alt="Breeze logo" fill /> */}
        <p>DbManaged</p>
      </Link>
      <div className="w-full relative">
        <Input className="w-full" placeholder="Search your products" />
        <Button className="h-full absolute aspect-square right-0 top-0">
          <Search size={16} />
        </Button>
      </div>
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="flex gap-2" variant={"ghost"}>
                Account
                <User size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href="/profile/orders">
                <DropdownMenuItem>Orders</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={async () => {
                  const { error } = await supabase.auth.signOut();
                  setUser(null);
                  router.push("/");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/cart">
            <Button className="flex gap-2" variant={"ghost"}>
              <ShoppingCart size={16} />
            </Button>
          </Link>
        </>
      ) : (
        <Link href="/auth">
          <Button className="flex gap-2">
            Login
            <LogIn size={16} />
          </Button>
        </Link>
      )}
    </nav>
  );
}

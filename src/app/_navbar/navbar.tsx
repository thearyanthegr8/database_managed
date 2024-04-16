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

const supabase = createClientComponentClient();

export default function Navbar() {
  //COPY: Sessions from here
  const [user, setUser] = useState<any>(null);

  async function session() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setUser(session?.user);
  }

  useEffect(() => {
    session();
  }, []);

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
              <Link href="/orders">
                <DropdownMenuItem>Orders</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={async () => {
                  const { error } = await supabase.auth.signOut();

                  if (error) {
                    toast({
                      variant: "destructive",
                      description: error.message,
                    });
                  } else {
                    setUser(null);
                  }
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

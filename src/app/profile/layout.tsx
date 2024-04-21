"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { Database } from "@/lib/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // setUser(session?.user.user_metadata);

      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", session?.user.id);

      if (user) {
        const { data: typeData, error: typeError } = await supabase
          .from(`${user[0].type.toLowerCase()}s`)
          .select("*")
          .eq("user_id", user[0].user_id);

        if (typeData) {
          user[0] = { ...user[0], ...typeData[0] };
        }
        setUser(user[0]);
        setLoading(false);
      }
    };

    fetchUser();
  }, [supabase, supabase.auth]);

  return (
    <main className="w-full justify-stretch py-[6rem] px-[5rem] flex h-screen gap-4">
      {loading || !user ? (
        <div className="w-full flex justify-center items-center">
          <Icons.spinner className="animate-spin" color="black" />
        </div>
      ) : (
        <>
          <div className="w-[20%] flex flex-col gap-4 h-full">
            <Button
              variant={pathname === "/profile" ? "secondary" : "ghost"}
              onClick={() => router.push("/profile")}
            >
              Profile
            </Button>
            {user && user.type === "CUSTOMER" && (
              <>
                <Button
                  variant={
                    pathname === "/profile/orders" ? "secondary" : "ghost"
                  }
                  onClick={() => router.push("/profile/orders")}
                >
                  Orders
                </Button>
              </>
            )}
            {user && user.type === "SUPPLIER" && (
              <>
                <Button
                  variant={
                    pathname === "/profile/warehouses" ? "secondary" : "ghost"
                  }
                  onClick={() => router.push("/profile/warehouses")}
                >
                  Warehouses
                </Button>
                <Button
                  variant={
                    pathname === "/profile/products" ? "secondary" : "ghost"
                  }
                  onClick={() => router.push("/profile/products")}
                >
                  Products
                </Button>
              </>
            )}
          </div>
          <Separator orientation="vertical" />
          <div className="w-[80%]">{children}</div>
        </>
      )}
    </main>
  );
}

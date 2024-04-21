"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Database } from "@/lib/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
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
    <main className="flex flex-col w-full gap-2">
      {/* {loading || !user ? (
        <div className="w-full flex justify-center items-center">
          <Icons.spinner className="animate-spin" color="black" />
        </div>
      ) : ( */}
      {/* <> */}
      <h1 className="text-2xl">Profile</h1>
      <Separator />
      <div className="">
        <h2 className="text-xl">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <Input
              id="name"
              value={user?.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <Input
              id="email"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="number" className="text-sm">
              Mobile{" "}
            </label>
            <Input
              id="number"
              value={user?.mobile}
              type="number"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) =>
                setUser({
                  ...user,
                  mobile: e.target.value,
                })
              }
            />
          </div>
          {user?.type === "CUSTOMER" && (
            <div>
              <label htmlFor="address" className="text-sm">
                Address
              </label>
              <Input
                id="address"
                value={user?.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => {}}>
          Edit Profile
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Change Password</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Not available</DialogTitle>
              <DialogDescription>
                This functionality has not been implemented yet.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button variant="secondary">Delete Account</Button>
      </div>
      {/* </> */}
      {/* )} */}
    </main>
  );
}

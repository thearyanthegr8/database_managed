"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Database } from "@/lib/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [warehouses, setWarehouses] = useState<any>(null);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(0);

  const handleEdit = async (index: number) => {
    const { data, error } = await supabase
      .from("warehouses")
      .update(warehouses[index])
      .eq("warehouse_id", warehouses[index].warehouse_id);
    console.log(data, error);
  };

  const handleCreate = async () => {
    const { data, error } = await supabase.from("warehouses").insert([
      {
        name,
        location,
        capacity,
        supplier_id: user.user_id,
      },
    ]);
    console.log(data, error);
  };

  const handleDelete = async (index: string) => {
    const { data, error } = await supabase
      .from("warehouses")
      .delete()
      .eq("warehouse_id", index);
    console.log(data, error);
  };

  const handleInputChange = (index: number, field: any, value: any) => {
    const updatedWarehouses = [...warehouses];
    updatedWarehouses[index] = {
      ...updatedWarehouses[index],
      [field]: value,
    };
    setWarehouses(updatedWarehouses);
  };

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

        try {
          const { data: warehouses, error: warehousesError } = await supabase
            .from("warehouses")
            .select("*")
            .eq("supplier_id", user[0].user_id);

          if (warehouses) {
            setWarehouses(warehouses);
            console.log(warehouses);
          }
        } catch (e) {
          console.error("Error fetching warehouses", e);
        }
      }
    };

    fetchUser();
  }, [supabase, supabase.auth]);

  return (
    <main className="flex flex-col w-full gap-2">
      <h1 className="text-2xl">Warehouses</h1>
      <Separator />
      <div className="">
        <div className="grid grid-cols-4 gap-4">
          {warehouses &&
            warehouses.map((warehouse: any, index: number) => (
              <Card
                key={warehouse.id}
                className="p-4 flex flex-col justify-center items-left gap-4"
              >
                <div>
                  <h2>{warehouse.name}</h2>
                  <p>Address: {warehouse.location}</p>
                  <p>Capacity: {warehouse.capacity}</p>
                </div>
                <div className="w-full flex gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Warehouse</DialogTitle>
                        <DialogDescription>
                          Edit the details of the warehouse.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="w-full flex flex-col gap-4">
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor={`name-${index}`}>Name</Label>
                          <Input
                            type="text"
                            id={`name-${index}`}
                            placeholder="Lorem Ipsum"
                            value={warehouse.name}
                            onChange={(e) =>
                              handleInputChange(index, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor={`location-${index}`}>
                            Location / Address
                          </Label>
                          <Input
                            type="text"
                            id={`location-${index}`}
                            placeholder="Shiv Nadar University, Dadri"
                            value={warehouse.location}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                          <Label htmlFor={`capacity-${index}`}>Capacity</Label>
                          <Input
                            type="number"
                            id={`capacity-${index}`}
                            placeholder="100"
                            value={warehouse.capacity}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "capacity",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => handleEdit(index)}
                        >
                          Edit Details
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    className="w-full"
                    variant={"destructive"}
                    onClick={() => handleDelete(warehouse.warehouse_id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="p-4 flex flex-col justify-center items-center gap-2 h-full max-h-[10rem]"
                variant={"outline"}
              >
                <Plus size={24} />
                <h2>Create a new warehouse</h2>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a warehouse</DialogTitle>
                <DialogDescription>
                  Here you can add a new warehouse to your account.
                </DialogDescription>
              </DialogHeader>
              <div className="w-full flex flex-col gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Lorem Ipsum"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="location">Location / Address</Label>
                  <Input
                    type="text"
                    id="location"
                    placeholder="Shiv Nadar University, Dadri"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    type="number"
                    id="capacity"
                    placeholder="100"
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value))}
                  />
                </div>
                <Button className="w-full" onClick={() => handleCreate()}>
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}

export default Page;

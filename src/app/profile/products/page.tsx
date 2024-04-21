"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Database } from "@/lib/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [warehouses, setWarehouses] = useState<any>(null);
  const [products, setProducts] = useState<any>(null);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [stockQuantity, setStockQuantity] = useState<number>(0);
  const [warehouseId, setWarehouseId] = useState<string>("");

  // const [name, setName] = useState<string>("");
  // const [location, setLocation] = useState<string>("");
  // const [capacity, setCapacity] = useState<number>(0);

  // const handleEdit = async (index: number) => {
  //   const { data, error } = await supabase
  //     .from("warehouses")
  //     .update(warehouses[index])
  //     .eq("warehouse_id", warehouses[index].warehouse_id);
  //   console.log(data, error);
  // };

  const handleCreate = async () => {
    const { data, error } = await supabase.from("products").insert([
      {
        name,
        sizes,
        colors,
        stock_quantity: stockQuantity,
        price,
        warehouse_id: warehouseId,
      },
    ]);
    console.log(data, error);
  };

  // const handleDelete = async (index: string) => {
  //   const { data, error } = await supabase
  //     .from("warehouses")
  //     .delete()
  //     .eq("warehouse_id", index);
  //   console.log(data, error);
  // };

  // const handleInputChange = (index: number, field: any, value: any) => {
  //   const updatedWarehouses = [...warehouses];
  //   updatedWarehouses[index] = {
  //     ...updatedWarehouses[index],
  //     [field]: value,
  //   };
  //   setWarehouses(updatedWarehouses);
  // };

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

          warehouses && setWarehouses(warehouses);

          warehouses &&
            warehouses.map(async (warehouse: any) => {
              const { data: products, error: productsError } = await supabase
                .from("products")
                .select("*")
                .eq("warehouse_id", warehouse.warehouse_id);

              if (products) {
                products.map((product: any) => {
                  setProducts([
                    ...products,
                    {
                      ...product,
                      warehouse: warehouse,
                    },
                  ]);
                });
              }
            });
        } catch (e) {
          console.error("Error fetching warehouses", e);
        }
      }
    };

    fetchUser();
  }, [supabase, supabase.auth]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <main className="flex flex-col w-full gap-2">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl">Products</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex justify-center items-center gap-2">
              <Plus size={14} />
              Add a product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="w-full flex flex-col gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor={`name`}>Name</Label>
                <Input
                  type="text"
                  id={`name`}
                  placeholder="Lorem Ipsum"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor={`sizes`}>Sizes</Label>
                <Input
                  type="text"
                  id={`sizes`}
                  placeholder="Shiv Nadar University, Dadri"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value.split(","))}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor={`colors`}>Colors</Label>
                <Input
                  type="text"
                  id={`colors`}
                  placeholder="100"
                  value={colors}
                  onChange={(e) => setColors(e.target.value.split(","))}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor={`prices`}>Price</Label>
                <Input
                  type="number"
                  id={`prices`}
                  placeholder="100"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor={`quantity`}>Quantity</Label>
                <Input
                  type="number"
                  id={`quantity`}
                  placeholder="100"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(parseInt(e.target.value))}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor={`warehouse`}>Warehouse</Label>
                <Select onValueChange={(e) => setWarehouseId(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Warehouses" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses &&
                      warehouses.map((warehouse: any) => (
                        <SelectItem
                          value={warehouse.warehouse_id}
                          key={warehouse.warehouse_id}
                        >
                          {warehouse.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={() => handleCreate()}>
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Qty Available</TableHead>
            <TableHead>Sizes</TableHead>
            <TableHead>Colors</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products &&
            products.map((product: any, index: number) => (
              <TableRow key={product.product_id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>{product.stock_quantity}</TableCell>
                <TableCell>
                  {product.sizes.map(
                    (size: string, index: number) =>
                      `${size}${product.sizes.length - 1 > index ? "," : ""} `
                  )}
                </TableCell>
                <TableCell>
                  {product.colors.map(
                    (color: string, index: number) =>
                      `${color}${product.colors.length - 1 > index ? "," : ""} `
                  )}
                </TableCell>
                <TableCell className="flex justify-center items-center gap-2">
                  <Button variant="outline">Edit</Button>
                  <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </main>
  );
}

export default Page;

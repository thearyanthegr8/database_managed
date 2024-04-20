"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

type item = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export default function Page() {
  const [items, setItems] = useState<item[]>([
    {
      id: "1",
      image: "",
      name: "Venkat",
      price: 10,
      quantity: 1,
    },
  ]);
  const [subTotal, setSubTotal] = useState<number>(
    items.reduce((total, item) => total + item.price * item.quantity, 0)
  );
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [Total, setTotal] = useState<number>(subTotal + deliveryFee);
  const decreaseQuantity = (item: item) => {
    if (item.quantity <= 1) {
      setItems((prev) => prev.filter((o) => o.id !== item.id));
    } else {
      setItems((prev) =>
        prev.map((o) =>
          o.id === item.id ? { ...o, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const increaseQuantity = (item: item) => {
    setItems((prev) =>
      prev.map((o) =>
        o.id === item.id ? { ...o, quantity: item.quantity + 1 } : item
      )
    );
  };

  const router = useRouter();

  return (
    <main className="flex w-full gap-[5rem]">
      <div className="w-[75%]">
        <Table>
          <TableCaption>Your cart!</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S. No.</TableHead>
              <TableHead>Item Image</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell></TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell className="flex gap-2 items-center justify-start">
                  <Button
                    variant={"outline"}
                    onClick={() => decreaseQuantity(item)}
                  >
                    -
                  </Button>
                  {item.quantity}
                  <Button
                    variant={"outline"}
                    onClick={() => increaseQuantity(item)}
                  >
                    +
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  {item.quantity * item.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-[25%]">
        <Card>
          <CardHeader>
            <CardTitle>Proceed to enter details</CardTitle>
            <CardDescription>
              Taxes added as extra charges where applied!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between">
            <p>Subtotal: </p>
            <p>{subTotal}</p>
          </CardContent>
          <CardContent className="flex justify-between">
            <p>Delivery fee: </p>
            <p>{deliveryFee}</p>
          </CardContent>
          <CardContent className="flex justify-between">
            <p>Total: </p>
            <p>{Total}</p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => router.push("/cart/checkout")} // :3
            >
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

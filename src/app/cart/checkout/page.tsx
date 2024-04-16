"use client"
import React from 'react';
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


type item = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}


const formSchema = z.object({
  fullname: z.string().min(2, {message: "Enter your full name."}).max(50),
  contactinfo: z.string().min(9, {message: "What's your email address and phone number?"}).max(50),
  fulladdress: z.string().min(2, {message: "Enter your full address, including house number, street, city, state and country"}).max(300),
  pincode: z.string().min(6, {message: "Enter your PIN Code"}).max(6),
  creditcarddetails: z.string().min(3, {message: "Fill in all your credit card details."}).max(50),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      contactinfo: "", // Should be a string
      fulladdress: "",
      pincode: "", // Should be a string
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const [items, setItems] = useState<item[]>([
    {
      id: "1",
      image: "",
      name: "Venkat",
      price: 10,
      quantity: 1,
    }
  ]);
  const [subTotal, setSubTotal] = useState<number>(items.reduce((total, item) => total + (item.price * item.quantity), 0));
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [Total, setTotal] = useState<number>(subTotal+deliveryFee); 
  const decreaseQuantity = (item: item) => {
    if (item.quantity <= 1) {
    setItems((prev) => prev.filter((o) => o.id !== item.id));
  } else {
    setItems((prev) => prev.map((o) => o.id === item.id ? ({...o, quantity: item.quantity - 1}) : item))
  }
  }

  const increaseQuantity = (item: item) => {
    setItems((prev) => prev.map((o) => o.id === item.id ? {...o, quantity: item.quantity + 1} : item));
  }

  const router = useRouter();

  return (
    <main className="flex w-full gap-[5rem]">
      <div className="w-[75%]">
        <div className="flex flex-col gap-2">
          <div className="space-y-1 justify-center">
            <h4 className="text-2xl font-extrabold leading-none">Checkout</h4>
            <p className="text-sm text-muted-foreground">
              Fill in your details!
            </p>
            <br />
            <p className="text-sm text-muted-foreground font-bold text-center">
              Express Pay using UPI
            </p>
          </div>
          <Separator className="h-[1px]" />
          <div className="flex items-center space-x-4 text-sm w-full justify-center">
            <div><Button variant="outline">GPay</Button></div>
            <Separator orientation="vertical" className="h-5" />
            <div><Button variant="outline">PayTM</Button></div>
            <Separator orientation="vertical" className="h-5" />
            <div><Button variant="outline">PhonePe</Button></div>
          </div>
          <Separator className="h-[1px]" />
          <div className="text-sm text-center text-bold">
            <h4>or continue below to pay with credit card</h4>
            <br></br>
            <div className="text-sm text-left">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Please write your First, Middle and Last Name (everything applicable)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator className="h-[1px]" />
                  <FormField
                    control={form.control}
                    name="contactinfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Information</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email address" {...field} />
                        </FormControl>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Omit country code.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator className="h-[1px]" />
                  <FormField
                    control={form.control}
                    name="fulladdress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your address" {...field} />
                        </FormControl>
                        <FormControl>
                          <Input placeholder="Apartment No./Suite No. etc" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter your house number, street, locality, city and country.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIN Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your PIN Code" {...field} />
                        </FormControl>
                        <FormDescription>
                          
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator className="h-[1px]" />
                  <FormField
                    control={form.control}
                    name="creditcarddetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Credit Card Details</FormLabel>
                        <div>
                        <FormControl>
                          <Input placeholder="Enter your CVV" {...field} />
                        </FormControl>
                        </div>
                        <div>
                        <FormControl> 
                          <Input placeholder="Enter Expiry Date (MM/YY)" {...field} />
                        </FormControl> 
                        </div>
                        <FormControl>
                          <Input placeholder="Enter your card number" {...field} />
                        </FormControl>
                        <FormDescription>
                          
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Confirm Payment & Place Order</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Thank you for shopping with us!</DialogTitle>
                    <DialogDescription>
                    <br></br>
                        See you again soon!
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
                </Dialog>
              </form>
            </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[25%]">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Taxes added as extra charges where applied!</CardDescription>
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
            
          </Card>
      </div>
    </main>
  );
}

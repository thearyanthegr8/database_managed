"use client";
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database.types";
import { CartAtom } from "@/atoms";
import { useAtom } from "jotai";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icons";

type item = {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
};

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<any>) {
    setLoading(true);
    try {
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          customer_id: user.user_id,
          delivery_fee: deliveryFee,
          total: Total,
          payment_mode: "Cash",
        })
        .select();

      // console.log(order[0].order_id);

      if (order !== null) {
        cart.forEach(async (item: item) => {
          try {
            const { data: product, error } = await supabase
              .from("orderproduct")
              .insert({
                order_id: order[0].order_id,
                product_id: item.product_id,
                qty: item.quantity,
                size: item.size,
                color: item.color,
              });
          } catch (e) {}
        });
      }

      toast({ description: "Order Placed Successfully!" });
      router.push(`/profile/orders`);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoading(false);
    }
  }

  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient<Database>();
  // const router = useRouter();

  const form = useForm<z.infer<any>>({
    // resolver: zodResolver(anySchema),
    defaultValues: {
      fullname: "",
      email: "", // Should be a string
      mobile: "",
      address: "",
    },
  });

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

        form.setValue("fullname", user[0].name);
        form.setValue("email", user[0].email);
        form.setValue("mobile", user[0].mobile);
        form.setValue("address", user[0].address);
      }
    };

    fetchUser();

    fetchUser();
  }, [form, supabase, supabase.auth]);

  const [cart, setCart] = useAtom<any[]>(CartAtom);

  const [subTotal, setSubTotal] = useState<number>(
    cart.reduce((total, item) => total + item.price * item.quantity, 0)
  );
  const [deliveryFee, setDeliveryFee] = useState<number>(10);
  const [Total, setTotal] = useState<number>(subTotal + deliveryFee);

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
          </div>
          <div className="text-sm text-center text-bold">
            <div className="text-sm text-left">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <Separator className="h-[1px]" />
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please write your First, Middle and Last Name
                          (everything applicable)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator className="h-[1px]" />
                  <div className="flex gap-2 w-full">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Email ID</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email address"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Mobile No.</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email address"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator className="h-[1px]" />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your address" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter your house number, street, locality, city and
                          country.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    variant="default"
                    className="w-full"
                    type="submit"
                    disabled={loading}
                  >
                    {loading && <Icons.spinner className="animate-spin mr-2" />}
                    Confirm Payment & Place Order
                  </Button>

                  {/* <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="default"
                        className="w-full"
                        type="submit"
                      >
                        Confirm Payment & Place Order
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          Thank you for shopping with us!
                        </DialogTitle>
                        <DialogDescription>
                          <br></br>
                          See you again soon!
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog> */}
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
        </Card>
      </div>
    </main>
  );
}

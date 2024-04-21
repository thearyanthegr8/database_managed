"use client";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { Database } from "@/lib/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any>(null);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", session?.user.id);

        if (user) {
          let pendingPromises = 0; // Track the number of pending promises

          const ordersDataPromises = user.map(async (userData) => {
            const { data: ordersData, error: ordersError } = await supabase
              .from("orders")
              .select("*")
              .eq("customer_id", userData.user_id);

            if (ordersData) {
              return Promise.all(
                ordersData.map(async (order) => {
                  const { data: orderItemsData, error: orderItemsError } =
                    await supabase
                      .from("orderproduct")
                      .select("*")
                      .eq("order_id", order.order_id);

                  if (orderItemsData) {
                    const orderItemsWithData = await Promise.all(
                      orderItemsData.map(async (orderItem) => {
                        const { data: productData, error: productError } =
                          await supabase
                            .from("products")
                            .select("*")
                            .eq("product_id", orderItem.product_id);

                        if (productData && productData.length > 0) {
                          orderItem.product = productData[0];
                        }
                        return orderItem;
                      })
                    );
                    order.orderItems = orderItemsWithData;
                  }
                  return order;
                })
              );
            }
          });

          pendingPromises = ordersDataPromises.length;

          const allOrdersData = await Promise.all(ordersDataPromises.flat());

          // Decrement pendingPromises for each resolved promise
          pendingPromises -= 1;

          if (pendingPromises === 0) {
            setLoading(false);
          }

          console.log(allOrdersData[0]);
          setOrders(allOrdersData[0]);
        }
      } catch (error) {
        console.error(error);
        setLoading(false); // Handle error case
      }
    };

    fetchUser();
  }, [supabase, supabase.auth]);

  return (
    <div className="flex flex-col gap-8">
      {loading ? (
        <div className="w-full flex justify-center">
          <Icons.spinner className="animate-spin h-8 w-8" />
        </div>
      ) : (
        orders &&
        orders.map((order: any) => (
          <Card
            key={order.order_id}
            className="p-4 flex flex-col gap-2 shadow-md"
            id={order.order_id}
          >
            <div className="flex w-full justify-between">
              <h1>Order ID: {order.order_id}</h1>
              <h3>Total: {order.total}</h3>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              {order.orderItems &&
                order.orderItems.map((orderItem: any, index: number) => (
                  <div key={orderItem.id}>
                    <p>{orderItem.product.name}</p>
                    <div className="grid grid-cols-2">
                      <p>Price: {orderItem.product.price}</p>
                      <p>Qty: {orderItem.qty}</p>
                      <p>Size: {orderItem.size}</p>
                      <p>Color: {orderItem.color}</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

export default Page;

"use client";
import { Database } from "@/lib/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any>(null);
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
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .eq("customer_id", user[0].user_id);

        if (ordersData) {
          const { data: orderItemsData, error: orderItemsError } =
            await supabase
              .from("orderproduct")
              .select("*")
              .eq("order_id", ordersData[0].order_id);

          console.log(orderItemsData);
        }

        setOrders(ordersData);

        setLoading(false);
      }
    };

    fetchUser();
  }, [supabase, supabase.auth]);

  return <div></div>;
}

export default Page;

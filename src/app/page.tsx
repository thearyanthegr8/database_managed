"use client";
import Image from "next/image";
import "./globals.css";
import Sidemenu from "./_landing-page/side-menu";
import Footer from "./_footer/footer";
import { Sidedash } from "./_landing-page/side-dash";
import Productcard from "./_landing-page/product-card";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[] | null>([]);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");

    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="flex flex-wrap w-full gap-10 justify-center py-[5rem] bg-[#e4e6e6] min-h-screen">
      {loading && <p>Loading...</p>}
      {products?.map((product) => (
        <Productcard {...product} key={product.product_id} />
      ))}
    </section>
  );
}

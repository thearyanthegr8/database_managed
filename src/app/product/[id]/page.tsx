"use client";
import { Button } from "@/components/ui/button";
import { products } from "@prisma/client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const supabase = createClientComponentClient();

export default function Page() {
  const [product, setProduct] = useState<products>();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  async function getProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("product_id", pathname.split("/")[2])
      .single();

    setProduct(data);
    setLoading(false);
  }

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen m-auto flex items-center py-[5rem] px-[5rem] h-full">
      <div className="relative flex w-1/2 justify-center items-center px-[5rem] h-full">
        <div className="w-full aspect-square relative">
          <Image
            src="/image/sample.jpg"
            alt="soda can"
            fill
            objectFit="cover"
          />
        </div>
      </div>
      <div className="flex flex-col w-1/2 items-start justify-start px-[5rem] h-full gap-4">
        <h1 className="text-3xl font-bold">{product?.name}</h1>
        <h2 className="text-xl font-bold">${product?.price}</h2>
        {/* <p className="text-sm">Description</p>
        <p className="text-sm">Lorem ipsum.....</p> */}
        <div className="flex gap-4 items-center">
          <Button
            variant={"outline"}
            onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
          >
            <Minus size={12} />
          </Button>
          <p>{quantity}</p>
          <Button variant={"outline"} onClick={() => setQuantity(quantity + 1)}>
            <Plus size={12} />
          </Button>
        </div>
        <div className="flex gap-4">
          {product?.sizes.map((s) => (
            <Button
              key={s}
              variant={s === size ? "secondary" : "outline"}
              onClick={() => setSize(s)}
            >
              {s}
            </Button>
          ))}
        </div>
        <div className="flex gap-4">
          {product?.colors.map((c) => (
            <Button
              key={c}
              variant={c === color ? "secondary" : "outline"}
              onClick={() => setColor(c)}
            >
              <span style={{ color: c }}>{c}</span>
            </Button>
          ))}
        </div>
        <Button className="w-full">Add to cart</Button>
      </div>
    </section>
  );
}

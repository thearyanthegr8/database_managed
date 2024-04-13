import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  image: string;
}

function Product({ image }: Props) {
  return (
    <div className=" justify-center w-60 h-96 rounded-2xl overflow-hidden bg-black">
      <div className="mt-8 relative w-60 h-40 aspect-square">
        <Image src={image} alt="product" fill />
      </div>
      <div className="p-16 text-stone-50">
        <h1>Pepsi</h1>
        <p>
          Pepsi 250ml can
        </p>
      </div>
      
    </div>
  );
}

export default Product;

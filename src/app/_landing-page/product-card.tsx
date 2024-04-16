import Link from "next/link";
import React from "react";
import Image from "next/image";

function Productcard({ ...product }) {
  return (
    <Link
      href={`/product/${product.product_id}`}
      className="relative flex w-full max-w-xs flex-col rounded-md border bg-white hover:shadow-md p-3 gap-2"
    >
      <div className="relative flex h-60  rounded-sm overflow-hidden">
        <Image
          className="object-cover"
          src="/image/sample.jpg"
          alt="product image"
          fill
        />
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-md">{product.name}</h5>
        <p className="text-md font-bold">
          <span className="">₹{product.price}</span>
        </p>
        <div className="flex gap-2 items-center">
          Sizes:
          {product.sizes.map((size: string, i: number) => (
            <p className="text-sm" key={i}>
              {size} {i === product.sizes.length - 1 ? "" : "|"}
            </p>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          Colors:
          {product.colors.map((color: string, i: number) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full border-2 border-black"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default Productcard;

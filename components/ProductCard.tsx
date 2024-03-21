import Link from "next/link";
import React from "react";

type ProductCardProps = {
  title: string;
  image: string;
  id: string;
};

const ProductCard = ({ title, image, id }: ProductCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center p-2 m-auto shadow rounded hover:shadow-xl w-56 h-[250px]">
      <div className="m-2 p-2">
        <p className="text-zinc-500 text-base">{title} </p>
      </div>
      <div className="w-[100px] h-[150px] m-2">
        <img src={image} />
      </div>
      <div className="text-zinc-500 font-extralight text-xs">ID: {id}</div>

      <Link
        className="text-zinc-500 font-extralight text-xs bg-zinc-200 w-full mt-2"
        href={`/product/${id}`}
      >
        LINK
      </Link>
    </div>
  );
};

export default ProductCard;

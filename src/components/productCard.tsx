import React from "react";
import { ProductData } from "../../type";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { MdStar } from "react-icons/md";
import FormatedPrice from "./formatedPrice";
import AddToCart from "./addToCart";

const ProductCard = ({ item }: { item: ProductData }) => {
  return (
    <div className="border border-px border-lightText/40 rounded-md relative group overflow-hidden">
      <Link href={`/product/${item?.slug.current}`}>
        <Image
          src={urlFor(item?.image).url()}
          alt={item?._type}
          width={500}
          priority
          height={500}
          className="w-full h-60  object-cover group-hover:scale-105 hoverEffect" // Set fixed height
        />
      </Link>
      <div className="px-6 flex flex-col items-center gap-2">
        <div className="text-base flex text-lightText items-center">
          {Array?.from({ length: 5 }).map((_, index) => {
            const filled = index + 1 <= Math.floor(item?.ratings);
            const halfFilled =
              index + 1 > Math.floor(item?.ratings) &&
              index + 1 <= Math.floor(item?.ratings) + 0.5;
            return (
              <MdStar
                className={`${
                  filled
                    ? "text-yellow-500"
                    : halfFilled
                      ? "text-yellow-300"
                      : "text-lightText"
                }`}
                key={index}
              />
            );
          })}
        </div>
        <p className="uppercase text-xs font-medium text-lightRed ">
          {item?.brand}
        </p>
        <h2 className="text-base font-semibold text-accent line-clamp-1">
          {item?.title}
        </h2>
        <p className="text-center line-clamp-2">{item?.description}</p>
        <div className="flex items-center mb-5 gap-3">
          <FormatedPrice
            amount={item?.price}
            className="text-lightText line-through"
          />
          <FormatedPrice
            amount={item?.rowprice}
            className="text-lightRed font-bold"
          />
        </div>
      </div>
      <AddToCart item={item} />
    </div>
  );
};

export default ProductCard;

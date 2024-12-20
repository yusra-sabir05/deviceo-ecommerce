"use client";

import { twMerge } from "tailwind-merge";

import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { addToCart } from "@/redux/deviceoSlice";
import { ProductData } from "@/type";
import SmallLoader from "./smallLoader";

interface Props {
  className?: string;
  item: ProductData;
}

const AddToCartButton = ({ className, item }: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    try {
      setLoading(true);
      dispatch(addToCart(item));
      toast.success(`${item?.title.substring(12, 0)} added successfully!`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleAddToCart}
      className={twMerge(
        "bg-accent text-white bg-black w-full py-2 border border-px border-accent hover:bg-yellow-800 hoverEffect font-semibold tracking-wide flex items-center justify-center gap-1",
        className
      )}
    >
      Add to cart {loading && <SmallLoader />}
    </button>
  );
};

export default AddToCartButton;

"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shoppingbag from "@/images/shoppingbag.png";
import { StoreState } from "../../type";
import CartItem from "./cartItem";
import { resetCart } from "@/redux/deviceoSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // Ensure Image is imported
import FormatedPrice from "./formatedPrice";
import { useSession } from "next-auth/react";

const CartContainer = () => {
  const [totalAmt, setTotalAmt] = useState(0);
  const { cart } = useSelector((state: StoreState) => state?.deviceo);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const handleReset = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    if (confirmed) {
      dispatch(resetCart());
      toast.success("Cart reset successfully!");
    }
  };
  useEffect(() => {
    let price = 0;
    cart.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [cart]);
  const createCheckout = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
        email: session?.user?.email,
      }),
    });

    const { url } = await response.json();

    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div>
      {cart?.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#f5f7f7] text-primeColor hidden lg:grid grid-cols-5 place-content-center px-6 text-lg font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {cart.map((item) => (
              <div key={item?._id}>
                <CartItem item={item} cart={cart} />
              </div>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300 rounded-md ml-2"
          >
            Reset Cart
          </button>
          <div className="flex flex-col md:flex-row justify-between border p-4 items-center gap-2 md:gap-0">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Coupon Number"
                className="w-44 lg:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
              />
              <p className="text-lg font-semibold">Apply Coupon</p>
            </div>
            <p>Update Cart</p>
          </div>
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal <FormatedPrice amount={totalAmt} />
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    <FormatedPrice amount={0} />
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    <FormatedPrice amount={totalAmt} />
                  </span>
                </p>
              </div>
              <div className="flex justify-end flex-col text-center">
                <button
                  onClick={createCheckout}
                  disabled={!session?.user}
                  className="bg-blueViolet text-white hover:bg-darkblueViolet hoverEffect px-8 py-3 rounded-lg font-semibold disabled:bg-lightOrange/50 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
                {!session?.user && (
                  <Link
                    href={"/signin"}
                    className="text-sm font-medium text-red-800"
                  >
                    Please sign in to make Checkout
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center py-20"
        >
          <div className="flex items-center max-w-[500px] p-4 py-8 bg-white rounded-md shadow-lg gap-4">
            <Image
              src="/images/shoppingbag.png" // Your image path
              alt="Shopping Cart Representation"
              width={200} // Specify desired width
              height={200} // Specify desired height
              className="rounded-md"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold uppercase text-center text-black mb-2">
                Your Cart is Empty
              </h1>
              <p className="text-sm text-center text-black px-2 mt-2">
                Your cart feels lonely! Explore and fill it with all the amazing
                gadgets you love. Start your shopping journey now!
              </p>
              <Link
                href="/shop"
                className="bg-blueViolet text-white hover:bg-darkblueViolet hoverEffect px-8 py-3 rounded-lg font-semibold text-center mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CartContainer;

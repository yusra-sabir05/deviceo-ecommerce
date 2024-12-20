import React from "react";
import { twMerge } from "tailwind-merge";
interface Props {
  amount: number;
  className?: string;
}
const FormatedPrice = ({ amount, className }: Props) => {
  const priceFormat = new Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    currency: "USD",
    style: "currency",
  });
  return (
    <span className={twMerge("text-base font-semibold", className)}>
      {priceFormat}
    </span>
  );
};

export default FormatedPrice;

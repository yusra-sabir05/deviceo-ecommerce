"use client";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"}>
      <h2
        className={twMerge(
          "text-2xl text-blueViolet hover:text-darkblueViolet font-bold uppercase hoverEffect relative group overflow-hidden",
          className
        )}
      >
        Deviceo
        <span className="absolute left-0 bottom-0 w-full h-px bg-darkblueViolet -translate-x-[105%] group-hover:translate-x-0 hoveEffect"></span>
      </h2>
    </Link>
  );
};

export default Logo;

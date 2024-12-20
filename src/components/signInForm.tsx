"use client";

import toast from "react-hot-toast";
import { LuAsterisk } from "react-icons/lu";
import Label from "./label";
import Input from "./input";

export const SignInForm = () => {
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("sign in on going");
  };
  return (
    <div>
      <h2 className="text-xl font-bold">Credential sign in</h2>
      <form onSubmit={handleSignIn} className="py-3 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">
            Username or email address{" "}
            <LuAsterisk className="text-lightRed text-xs" />
          </Label>
          <Input type="email" placeholder="john@youremail.com" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">
            Password <LuAsterisk className="text-lightRed text-xs" />
          </Label>
          <Input type="password" placeholder="ex:#123456$" required />
        </div>
        <button className="rounded-md mt-3 bg-blue-600 text-white font-semibold py-2 px-4 hover:bg-blue-600 transition duration-300">
          Sign In
        </button>
      </form>
    </div>
  );
};

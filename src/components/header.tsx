import Link from "next/link";
import { HiMenuAlt2 } from "react-icons/hi";
import { navBarList } from "@/constants";
import Logo from "./logo";
import SearchInput from "./searchinput";
import { getSession } from "@/lib/manageSession";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = async () => {
  const session = await getSession();

  return (
    <header className="w-full h-20 bg-white border-b-[1px] border-lightText/20 sticky top-0 z-50">
      <div className="h-full max-w-screen-xl mx-auto px-4 flex items-center justify-between gap-5 lg:gap-10">
        <Logo />
        <SearchInput />
        <div className="hidden md:inline-flex items-center gap-7">
          {navBarList.map((item) => (
            <Link
              href={item?.link}
              key={item?.link}
              className="text-base font-semibold hover:text-darkblueViolet duration-300"
            >
              {item?.title}
            </Link>
          ))}
          {session ? (
            <Link
              href={"/dashboard"}
              className="text-base font-semibold hover:text-darkblueViolet duration-300"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href={"/signin"}
              className="text-base font-semibold hover:text-darkblueViolet duration-300"
            >
              Sign in
            </Link>
          )}
          {session?.user?.email === process.env.ADMIN_EMAIL && (
            <Link
              href={"/studio"}
              className="text-base font-semibold hover:text-darkblueViolet duration-300"
            >
              Studio
            </Link>
          )}
          {session?.user && (
            <Link
              href={"/orders"}
              className="text-base font-semibold hover:text-darkblueViolet duration-300"
            >
              Orders
            </Link>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet>
          {/* Trigger button */}
          <SheetTrigger asChild>
            <HiMenuAlt2 className="inline-flex md:hidden cursor-pointer w-8 h-6" />
          </SheetTrigger>

          {/* Sheet content with navigation links */}
          <SheetContent className="w-3/4 max-w-md">
            {" "}
            {/* Adjust width here */}
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navigate through our site.</SheetDescription>
            </SheetHeader>
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-4">
              {navBarList.map((item) => (
                <Link
                  href={item?.link}
                  key={item?.link}
                  className="text-base font-semibold hover:text-darkblueViolet duration-300"
                >
                  {item?.title}
                </Link>
              ))}
              {session ? (
                <Link
                  href={"/dashboard"}
                  className="text-base font-semibold hover:text-darkblueViolet duration-300"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href={"/signin"}
                  className="text-base font-semibold hover:text-darkblueViolet duration-300"
                >
                  Sign in
                </Link>
              )}
              {session?.user?.email === process.env.ADMIN_EMAIL && (
                <Link
                  href={"/studio"}
                  className="text-base font-semibold hover:text-darkblueViolet duration-300"
                >
                  Studio
                </Link>
              )}
              {session?.user && (
                <Link
                  href={"/orders"}
                  className="text-base font-semibold hover:text-darkblueViolet duration-300"
                >
                  Orders
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

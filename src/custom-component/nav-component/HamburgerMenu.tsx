import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { NavigationItems } from "./NavigationItems";
import { Link } from "react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import useCart from "../cart/custom-hook/useCart";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useLocalStorage<number | null>("userId", null);
  console.log(userId);
  const { cartItems } = useCart({ userId });
  return (
    <>
      <Button
        variant="outline"
        className="flex md:hidden max-w-10 border-2 text-center self-center"
        onClick={() => setIsOpen(true)}
      >
        <GiHamburgerMenu size={24} />
      </Button>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`flex flex-col fixed top-0 right-0 w-full max-w-[20rem] h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close button */}
          <Button
            onClick={() => setIsOpen(false)}
            className="self-end m-3 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
            variant="ghost"
          >
            <IoClose className="!size-7" />
          </Button>

          {/* Menu Items (with padding & better spacing) */}
          <div className="pt-16 px-4 space-y-4 flex flex-col">
            {/* Login and cart button */}
            {/* Only display cart btn if user is signed it */}
            {userId && (
              <Link
                to={"/cart"}
                className="flex items-center p-3 text-sm w-full font-medium transition-bg duration-250 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Cart ({cartItems?.length ?? 0})
              </Link>
            )}
            {/* Only display order btn if user is signed in */}
            {userId && (
              <Link
                to={"/order"}
                className="flex items-center p-3 text-sm w-full font-medium transition-bg duration-250 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Order
              </Link>
            )}
            {/* Display login btn if user is signed out else vice versa */}
            {!userId && (
              <Link
                to="/auth/login"
                className="flex items-center p-3 text-sm w-full font-medium transition-bg duration-250 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
            {NavigationItems.map((item) => (
              <Link
                to={item.href}
                key={item.href}
                className="flex items-center p-3 text-sm font-medium transition-bg duration-250 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {userId && (
              <Link
                to="/auth/login"
                className="flex items-center p-3 text-sm w-full font-medium transition-bg duration-250 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={() => {
                  setIsOpen(false);
                  setUserId(null);
                }}
              >
                Sign out
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HamburgerMenu;

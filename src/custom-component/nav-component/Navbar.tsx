import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import HamburgerMenu from "./HamburgerMenu";
import { NavigationItems } from "./NavigationItems";
import { Link } from "react-router";
import useCart from "../cart/custom-hook/useCart";
import { useLocalStorage } from "@uidotdev/usehooks";

function Navbar() {
  const [userId, setUserId] = useLocalStorage<number | null>("userId");
  const { cartItems } = useCart({ userId: userId });

  const handleSignOut = () => {
    setUserId(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-white shadow-lg w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex h-16 justify-between items-center w-full">
          <div className="flex items-center">
            {/* Website name */}
            <a
              href="/"
              className="mb-2 flex items-center text-xl font-bold text-gray-800 transition-opacity ease-in-out duration-250 hover:opacity-70"
            >
              BookStore
            </a>

            {/* Navigation Links */}
            <div className="hidden md:ml-6 md:flex md:space-x-8 items-center">
              {NavigationItems.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  className="flex items-center border-b-2 h-8 border-transparent px-1 text-sm transition-border-color duration-250 font-medium text-gray-500 hover:border-b-gray-300 hover:text-gray-700"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Search, Cart, Login buttons */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {/* Search input and button */}
              <SearchBar />
              {/* Only display cart btn if user is signed it */}
              {userId && (
                <Link to={"/cart"}>
                  <Button variant="outline" className="text-sm md:flex hidden">
                    Cart ({cartItems?.length ?? 0})
                  </Button>
                </Link>
              )}
              {/* Only display order btn if user is signed in */}
              {userId && (
                <Link to={"/order"}>
                  <Button variant="outline" className="text-sm md:flex hidden">
                    Order
                  </Button>
                </Link>
              )}
              {/* User is not signed in */}
              {!userId && (
                <Link to="/auth/login">
                  <Button variant="outline" className="text-sm md:flex hidden">
                    Login
                  </Button>
                </Link>
              )}
              {/* User is signed in */}
              {userId && userId !== null && (
                <Link to="/auth/register">
                  <Button
                    variant="outline"
                    className="text-sm md:flex hidden"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Menu */}
          <HamburgerMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

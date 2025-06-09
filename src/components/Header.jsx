import {
  FiTruck,
  FiSearch,
  FiPhone,
  FiUser,
  FiShoppingCart,
} from "react-icons/fi";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg">
              <FiTruck className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 hidden sm:block tracking-tight">
              REMWaste
            </h1>
          </div>

          {/* Main Nav */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {["Services", "Pricing", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-black hover:text-primary hover:underline underline-offset-4 font-medium transition duration-200 uppercase"
              >
                {item}
              </a>
            ))}

            {/* Icons */}
            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
              {[FiSearch, FiUser].map((Icon, i) => (
                <button
                  key={i}
                  className="p-2 text-gray-600 hover:text-primary rounded-full transition hover:bg-gray-100"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
              {/* Cart */}
              <button className="p-2 text-gray-600 hover:text-primary rounded-full transition hover:bg-gray-100 relative">
                <FiShoppingCart className="w-5 h-5" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-white text-xs font-semibold flex items-center justify-center rounded-full">
                  0
                </span>
              </button>
            </div>

            {/* Phone Button */}
            <a
              href="#"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark flex items-center transition duration-200"
            >
              <FiPhone className="mr-2 text-lg sm:text-base" />
              <span className="hidden lg:inline whitespace-nowrap">
                020 1234 5678
              </span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="px-4 py-4 bg-white shadow-md space-y-3">
            {["Services", "Pricing", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block text-gray-700 font-medium py-2 px-3 rounded-md hover:bg-gray-50 hover:text-primary transition"
              >
                {item}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-200 flex flex-col items-center space-y-3">
              {[FiSearch, FiUser, FiShoppingCart].map((Icon, i) => (
                <button
                  key={i}
                  className="p-2 text-gray-600 hover:text-primary rounded-full hover:bg-gray-100 transition"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
              <a
                href="#"
                className="w-full flex items-center justify-center px-4 py-2 text-white bg-primary rounded-md font-medium hover:bg-primary-dark"
              >
                <FiPhone className="mr-2" /> Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

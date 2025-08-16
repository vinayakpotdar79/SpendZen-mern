import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiDollarSign,
  FiUser,
  FiLogOut,
} from "react-icons/fi";


export default function Navbar({onLogout, user}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: <FiHome /> },
    { name: "Expenses", path: "/expenses", icon: <FiDollarSign /> },
    { name: "Profile", path: "/profile", icon: <FiUser /> },
  ];

    const handleLogout = () => {
    onLogout();
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo + Desktop Links */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-indigo-600 flex items-center space-x-2"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/2409/2409313.png"
                alt="Money Bag"
                className="h-8 w-8"
              />
              <span>SpendZen</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`inline-flex items-center gap-2 px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "border-indigo-500 text-indigo-600"
                        : "border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop Logout */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <FiLogOut className="mr-1" /> Logout
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center p-4 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
          <button
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
            className="flex items-center w-full p-4 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 border-t border-gray-200"
          >
            <FiLogOut className="mr-3" > 
              <link to ="/logout">
              Logout
              </link>
              </FiLogOut>
          </button>
        </div>
      )}
    </nav>
  );
}

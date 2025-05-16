import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
  FaHome,
  FaUtensils,
  FaList,
  FaClipboardCheck,
  FaClipboardList,
  FaWarehouse,
  FaBox,
} from "react-icons/fa";
import { AdminContext } from "../context/AdminContext";
import { SubAdminContext } from "../context/SubAdminContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { aToken, setAToken, maToken, setMaToken, saToken, setSaToken } = useContext(AdminContext);
  const { setSaRole, setMaRole } =
    useContext(SubAdminContext);

  const navLinks = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <FaHome className="mr-2" />,
    },
    {
      path: "/admin/menu",
      label: "All Menu",
      icon: <FaUtensils className="mr-2" />,
    },
    {
      path: "/admin/categories",
      label: "Categories",
      icon: <FaList className="mr-2" />,
    },
    {
      path: "/admin/accepted-orders",
      label: "Accepted Orders",
      icon: <FaClipboardCheck className="mr-2" />,
    },
    {
      path: "/admin/accept-order",
      label: "Accept Order",
      icon: <FaClipboardList className="mr-2" />,
    },
    {
      path: "/admin/inventory",
      label: "Inventory",
      icon: <FaWarehouse className="mr-2" />,
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    if (aToken) {
      setAToken(null);
      localStorage.removeItem("aToken");
      navigate("/");
    } else if (saToken) {
      setSaToken(null);
      setSaRole(null);
      localStorage.removeItem("saToken");
      localStorage.removeItem("saRole");
      navigate("/");
    } else if (maToken) {
      setMaToken(null);
      setMaRole(null);
      localStorage.removeItem("maRole");
      localStorage.removeItem("maToken");
      navigate("/");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
      style={{
        WebkitBackdropFilter: isScrolled ? "none" : "blur(8px)",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <Link
              to="/admin/dashboard"
              className="flex-shrink-0 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <span
                className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent"
                style={{
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  textRendering: "optimizeLegibility",
                }}
              >
                TRAFIK
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {aToken && (
              <Link
                to="/admin/add-subadmin"
                className="flex items-center ml-2 px-3 py-2 text-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-md hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-sm"
              >
                <FaPlus className="mr-1.5" />
                Add Subadmin
              </Link>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="hidden md:flex items-center ml-4">
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <FaUserCircle className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium hidden lg:inline">
                  {aToken ? "Admin" : maToken ? "Menuadmin" : "Subadmin"}
                </span>
                {isProfileOpen ? (
                  <FaChevronUp className="h-3 w-3 hidden lg:inline" />
                ) : (
                  <FaChevronDown className="h-3 w-3 hidden lg:inline" />
                )}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
        style={{
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          WebkitPerspective: 1000,
          perspective: 1000,
        }}
      >
        <div className="px-2 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              style={{
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {aToken && (
            <Link
              to="/admin/add-subadmin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center px-4 py-2 mx-2 my-2 text-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-md hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-sm"
            >
              <FaPlus className="mr-2" />
              Add Subadmin
            </Link>
          )}

          <div className="border-t border-gray-200 mt-2 pt-4">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <FaUserCircle className="h-8 w-8" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {aToken ? "Admin" : maToken ? "Menuadmin" : "Subadmin"}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

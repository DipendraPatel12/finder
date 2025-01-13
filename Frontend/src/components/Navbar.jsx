import { useState, useEffect } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";
import { Navigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Navbar toggle for mobile menu
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setSidebarOpen(false); // Close sidebar when opening mobile menu
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setIsOpen(false); // Close mobile menu when opening sidebar
  };

  // Prevent scrolling when mobile menu or sidebar is open
  useEffect(() => {
    if (isOpen || sidebarOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
  }, [isOpen, sidebarOpen]);

  return (
    <nav className="bg-black text-white p-1">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="text-white py-2 px-3 rounded-md">
            RoomFinder
          </Link>
        </h1>

        {/* Mobile Menu Icon */}
        <div className="md:hidden z-50" onClick={toggleMenu}>
          <FaBars size={24} />
        </div>

        {/* Navbar Links */}
        <ul
          className={`md:flex md:space-x-6 md:static md:w-auto z-20 fixed top-0 right-0 h-full w-2/4 bg-black p-8 flex-col items-center transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 md:flex-row md:p-0`}
        >
          <li className="p-2 text-center">
            <Link
              to="/rooms"
              className="bg-white text-black hover:bg-orange-300 py-2 px-3 rounded-md"
              onClick={toggleMenu} // Automatically hides menu when clicked
            >
              Rooms
            </Link>
          </li>

          {/* Show User Icon if Logged In */}
          {isAuthenticated ? (
            <li className="p-2 text-center flex items-center cursor-pointer hover:bg-orange-300 rounded-lg">
              <FaUser size={24} onClick={toggleSidebar} />
            </li>
          ) : (
            <li className="p-2 text-center">
              <Link
                to="/login"
                className="bg-white text-black hover:bg-orange-300 py-2 px-3 rounded-md"
                onClick={toggleMenu} // Automatically hides menu when clicked
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Sidebar for Authenticated User */}
      {sidebarOpen && (
        <div className="fixed top-0 right-0 h-screen w-64 bg-black text-white p-6 shadow-lg z-50 transition-transform transform duration-300 ease-in-out">
          {/* User Icon Centered */}
          <div className="flex justify-center items-center mb-6">
            <FaUser size={60} />
          </div>

          {/* Sidebar Buttons */}
          <ul className="space-y-4">
            <li className="flex justify-center">
              <Link
                to="/myposts"
                className="block bg-white text-black hover:bg-orange-300 py-1 px-4 rounded-md"
                onClick={toggleSidebar} // Automatically hides sidebar when clicked
              >
                My Posts
              </Link>
            </li>
            <li className="flex justify-center">
              <Link
                to="/createpost"
                className="block bg-white text-black hover:bg-orange-300 py-1 px-4 rounded-md"
                onClick={toggleSidebar} // Automatically hides sidebar when clicked
              >
                Create
              </Link>
            </li>
            <li className="flex justify-center">
              <button
                onClick={() => {
                  logout();
                  toggleSidebar();
                   // Automatically hides sidebar after logout
                }}
                className="block bg-white text-black hover:bg-orange-300 py-1 px-4 rounded-md"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

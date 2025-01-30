import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, LogOut, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/img.jpg"
              alt="Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="font-extrabold text-2xl text-white hover:text-pink-100 transition">
              Women Safety
            </span>
          </Link>

          
          <div className="flex items-center space-x-4">
            {user ? (
            <>
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center text-white hover:text-pink-200 transition-all duration-300">
                <Home className="h-6 w-6 mr-2" /> 
                <span className="text-lg font-medium">Home</span>  
              </Link>
              <Link to="/add-contact" className="flex items-center text-white hover:text-pink-200 transition-all duration-300">
                <UserPlus className="h-6 w-6 mr-2" />  
                <span className="text-lg font-medium">Add Contact</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-white hover:text-pink-200 transition-all duration-300"
              >
                <LogOut className="h-6 w-6 mr-2" />  
                <span className="text-lg font-medium">Logout</span>
              </button>
            </div>
          </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 hover:shadow-lg transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 hover:shadow-lg transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

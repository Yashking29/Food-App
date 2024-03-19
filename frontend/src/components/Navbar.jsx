import React from 'react';
import UserContextProvider from '../contexts/UserContextProvider';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Navbar = () => {

    const {user}=useContext(UserContext);
    const navigate=useNavigate();


  return (
    <UserContextProvider>
    <nav className="bg-gray-800 p-4">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl">YesFood</span>
      </div>
      <div className="flex justify-center flex-1 space-x-4">
        <a href="#" className="nav-link">Home</a>
        <Link to="/cart" className="nav-link">Cart</Link>
        <Link to="/feedback" className="nav-link">Feedback</Link>
        <Link to="/contact" className="nav-link">Contacts</Link>
      </div>
      <div>
        <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          <span className="text-lg font-bold text-yellow-500 mr-1">Hi</span>
          <span className="text-base ">{user}!</span>
        </p>
      </div>
    </div>
  </div>
</nav>

  </UserContextProvider>
  );
};

export default Navbar;

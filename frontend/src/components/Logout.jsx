import React from 'react';
import Cookies from 'js-cookie'; 

const Logout = () => {
  const handleLogout = () => {
    // Perform logout logic here, such as clearing local storage, revoking tokens, etc.
    // Example:
    localStorage.removeItem('namex'); // Clear access token from local storage
    localStorage.removeItem('email'); // Clear user data from local storage
    Cookies.remove('token');
    // Redirect to login page or any other appropriate page
    window.location.href = '/login'; // Replace '/login' with the path to your login page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-8 border rounded-md shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Logout</h1>
        <p className="text-lg mb-4">Are you sure you want to logout?</p>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;

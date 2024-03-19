import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import List from './List'; // Import the List component

axios.defaults.withCredentials = true;

const Cart = () => {
  const [amount, setAmount] = useState(0);
  const [frequency, setFrequency] = useState([]);
  const [previousFrequency, setPreviousFrequency] = useState([]);
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem('username');
  const name = localStorage.getItem('namex');
  const user = localStorage.getItem('email');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verify user authentication
        const verifyResponse = await axios.get('http://localhost:3000/auth/verify', { withCredentials: true });
        console.log(verifyResponse);
        if (!verifyResponse.data.status) {
          console.log('User not logged in, redirecting to login page');
          navigate('/login');
          return; // Stop further execution
        }

        // Fetch user orders
        console.log("Start fetching orders");
        console.log(user); // Make sure user is correctly set
        const ordersResponse = await axios.post('http://localhost:3000/auth/orders', { user });
        console.log('before orders');
        console.log(ordersResponse);
        if(ordersResponse.data.status){
          return;
        }
        console.log("after orders");
        const table = ordersResponse.data.names;
        table.shift(); // Remove first element

        // Calculate order frequencies and total amount
        const frequencyMap = {};
        table.forEach(obj => {
          const key = JSON.stringify(obj); // Convert object to string for using as key
          frequencyMap[key] = (frequencyMap[key] || 0) + 1; // Increment frequency
        });

        const arrayOfObjects = Object.entries(frequencyMap).map(([key, value]) => {
          const obj = JSON.parse(key);
          return { object: obj, frequency: value };
        });

        let sum = 0;
        for (let i = 0; i < arrayOfObjects.length; i++) {
          let val = Number(arrayOfObjects[i].frequency);
          let p = Number(arrayOfObjects[i].object.price);
          let c = val * p;
          sum += c;
        }

        console.log("Fetched orders successfully");
        console.log("Total amount:", sum);

        // Update state with fetched data
        setAmount(sum.toFixed(2));
        setFrequency(arrayOfObjects);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/login'); // Redirect to login page in case of error
      }
    };

    fetchData(); // Call the fetchData function
  }, [user, navigate]);

  const handleOrderNow = async () => {
    try {
      // Delete the entry from the database
      await axios.delete('http://localhost:3000/auth/deleteOrder', { data: { user } });
      console.log('Entry deleted from database');

      // Save current list as previous list
      setPreviousFrequency(frequency);
      // Clear current list
      setFrequency([]);
      // Implement logic to handle order submission
      // For example, you can navigate to a checkout page
     
    } catch (error) {
      console.error('Error deleting entry from database:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-red-500 to-blue-500 text-white py-2 rounded-lg">Items in Cart for {name}: {frequency.length}</h2>

      <List arrayOfObjects={frequency} />
      
      {previousFrequency.length > 0 && (
        <>
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-red-500 to-blue-500 text-white py-2 rounded-lg">Placed Orders:</h2>
          <List arrayOfObjects={previousFrequency} />
        </>
      )}
     
      <h2 className="text-xl font-semibold text-center mt-8">Total Amount is <span className="text-green-500 font-bold">${amount}</span></h2>
      <div className="flex justify-center mt-8">
        <button className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleOrderNow}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Cart;

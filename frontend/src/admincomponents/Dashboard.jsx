import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

const storedUsername = localStorage.getItem('username');
const name = localStorage.getItem('namex');
const user = localStorage.getItem('email');

function Dashboard() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  // Fetch orders from the database
  useEffect(() => {
    // Assume fetchPendingOrders and fetchCompletedOrders are functions to fetch orders from the database
    fetchPendingOrders();
    fetchCompletedOrders();
  }, [setPendingOrders,setCompletedOrders]);

  const fetchPendingOrders = async () => {
    
    const homeRes = await Axios.get('http://localhost:3000/auth/pending');
    console.log(homeRes)
   
    setPendingOrders(homeRes.data);
  };

  const fetchCompletedOrders = async () => {
    
    const homeRes = await Axios.get('http://localhost:3000/auth/completed');
    console.log(homeRes)


    
    setCompletedOrders(homeRes.data);
  };

  const handleMoveToCompleted = async (order) => {
    try {
      const response = await Axios.post('http://localhost:3000/auth/toComplete', { orderId: order._id });
      if (response.status) {
        // Update local state to move the order from pendingOrders to completedOrders
        const updatedPendingOrders = pendingOrders.filter(o => o._id !== order._id);
        setPendingOrders(updatedPendingOrders);
        setCompletedOrders([...completedOrders, order]);
        console.log(`Order ${order._id} moved to completed.`);
      } else {
        console.error('Failed to move order to completed.');
      }
    } catch (error) {
      console.error('Error moving order to completed:', error);
    }
  };

  const handleMoveTodelete = async (order) => {
    try {
      const response = await Axios.post('http://localhost:3000/auth/todelete', { orderId: order._id });
      if (response.status) {
        // Update local state to move the order from pendingOrders to completedOrders
        
        setCompletedOrders(prevArray => prevArray.filter(item => item !== order));
        
        console.log(`Order ${order._id} moved to deleted.`);
      } else {
        console.error('Failed to delete order .');
      }
    } catch (error) {
      console.error('Error moving order to completed:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <div className='flex justify-center'> <h2 className="text-2xl font-bold mb-4 text-red-900">Pending Orders</h2></div>
        
        <ul>
          {pendingOrders.map((order) => (
            <li key={order.id} className="flex justify-between items-center py-2 border-b border-gray-300">
              <div>
                <span className="text-lg font-bold">{order.name}</span>
               
                <p className="text-sm text-gray-600">Status: {order.status}</p>
                <p className="text-sm text-gray-600">ID: {order._id}</p>
              </div>
              <button onClick={() => handleMoveToCompleted(order)} className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600">Move to Completed</button>
            </li>
          ))}
        </ul>
      </div>

      

      <div>
      <div className='flex justify-center'> <h2 className="text-2xl font-bold mb-4 text-green-900">Completed Orders</h2></div>
        <ul>
          {completedOrders.map((order) => (
            <li key={order.id} className="flex justify-between items-center py-2 border-b border-gray-300">
              <div>
                <span className="text-lg font-bold">{order.name}</span>
               
                <p className="text-sm text-gray-600">Status: {order.status}</p>
                <p className="text-sm text-gray-600">ID: {order._id}</p>
              </div>
              <button onClick={() => handleMoveTodelete(order)} className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600">To delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}

export default Dashboard;

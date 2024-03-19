// src/Card.js

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';



function Home() {
  const [cards, setCards] = useState([]);
  const [cart, setCart] = useState([]);
  const storedUsername = localStorage.getItem('namex');
  const storedEmail=localStorage.getItem('email');
  const {user,setuser}=useContext(UserContext);
  setuser(storedUsername);
  const navigate=useNavigate();
  Axios.defaults.withCredentials=true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const verifyRes = await Axios.get('http://localhost:3000/auth/verify',{withCredentials:true});
        if (verifyRes.data.status) {
          console.log("authorized at frontend");
          const homeRes = await Axios.get('http://localhost:3000/auth/home');
          setCards(homeRes.data);
        } else {
          console.log("logged out")
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const addToCart = async (item) => {
    
    setCart([...cart, item]);
    
    console.log(item);
    await Axios.post("http://localhost:3000/auth/order",{
      storedEmail,item
    }).then(response=>{
       console.log(response)
      
     

    }).catch(err =>{
       console.log(err)
    })
    
    // console.log(cart.length())
    alert(`The ${item.name} is added to the cart`)

  };


  return (
    <>
    
    
    
    
     <Navbar/>
     
     
     
     
     <div className="flex flex-wrap justify-center">
     {cards.map(card => (
       <div key={card.item_id} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
         <img className="w-full" src={card.img_src} alt={card.name} />
         <div className="px-6 py-4">
           <div className="font-bold text-xl mb-2">{card.name}</div>
           <p className="text-gray-700 text-base">Price: ${card.price}</p>
           <button onClick={() => addToCart(card)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Add to Cart</button>
         </div>
       </div>
     ))}
   </div>
   <Link to="/cart" className="fixed bottom-0 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Go to Cart</Link>
    </>
    
    
  );
}

export default Home;

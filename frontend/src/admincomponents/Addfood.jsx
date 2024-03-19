import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Addfood() {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here you can use the values of productId, productName, productPrice, and productImageUrl
    // for further processing like sending to the server or storing in state.

    console.log({
      productId,
      productName,
      productPrice,
      productImageUrl
    });

    // You can also reset the form after submission
    setProductId('');
    setProductName('');
    setProductPrice('');
    setProductImageUrl('');
  };

  // Function to check if all fields are filled
  const isFormValid = () => {
    return productId.trim() !== '' && productName.trim() !== '' && productPrice.trim() !== '' && productImageUrl.trim() !== '';
  };

  const handleaddfood =async()=>{
   e.preventDefault();
   const food={
      id:productId,
      name:productName,
      price:productPrice,
      url:productImageUrl

   }
   try {
    const response = await Axios.post('http://localhost:3000/auth/toaddfood', { food });
    if (response.status) {
       
       alert(`The ${proudctName} is added to Database`);
    
    } else {
      console.error('Failed to move order to completed.');
    }
  } catch (error) {
    console.error('Error moving order to completed:', error);
  }
     
  }


  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-center">Add Food</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productId" className="block text-sm font-medium text-gray-700">ID:</label>
          <input type="text" id="productId" value={productId} onChange={(e) => setProductId(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Name:</label>
          <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Price:</label>
          <input type="text" id="productPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="productImageUrl" className="block text-sm font-medium text-gray-700">Image URL:</label>
          <input type="text" id="productImageUrl" value={productImageUrl} onChange={(e) => setProductImageUrl(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md" />
        </div>
        <button onClick={() => handleaddfood(e)} type="submit" disabled={!isFormValid()} className={`bg-blue-500 text-white py-2 px-4 rounded-md ${!isFormValid() && 'opacity-50 cursor-not-allowed'}`}>Submit</button>
      </form>
    </div>
  );
}

export default Addfood;

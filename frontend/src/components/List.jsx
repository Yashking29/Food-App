import React from 'react';

const List = ({ arrayOfObjects }) => {
  if (arrayOfObjects.length === 0) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <p className="text-gray-500">No items to display.</p>
      </div>
    )
  }

  return (
    <div className='flex items-start justify-center w-full'>
  <div className='flex flex-col justify-around bg-gray-800 rounded-lg w-full max-w-screen-lg p-4'>
    <div className='flex justify-between bg-gray-900 rounded-t-lg px-4 py-2'>
      <p className='text-white font-bold'>Index</p>
      <p className='text-white font-bold'>Name</p>
      <p className='text-white font-bold'>Price</p>
      <p className='text-white font-bold'>Quantity</p>
      <p className='text-white font-bold'>Amount</p>
    </div>
    {arrayOfObjects.map((item, index) => (
      <div key={index} className={`flex justify-between ${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'} rounded-b-lg px-4 py-2`}>
        <p className={`${index % 2 === 0 ? 'text-gray-300' : 'text-gray-200'}`}>{Number(index) + 1}</p>
        <p className='text-yellow-500'>{item.object.name}</p>
        <p className='text-yellow-300'>${item.object.price}</p>
        <p className='text-blue-400'>{item.frequency}</p> {/* Quantity color */}
        <p className='text-green-500'>${(Number(item.object.price) * Number(item.frequency)).toFixed(2)}</p> {/* Fix decimal places */}
      </div>
    ))}
  </div>
</div>

  )
}

export default List;

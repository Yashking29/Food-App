import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { Link } from 'react-router-dom';

function Forgotpassword() {
   
    const [email,setEmail] = useState('')
    const handleSubmit =(e)=>{
        e.preventDefault()
        Axios.post("http://localhost:3000/auth/forgot",{
           email
        }).then(response=>{
           console.log(response)
           if(response.data.status){
              alert("check your email for reset passwrod link")
               navigate('/home')
           }
         
    
        }).catch(err =>{
           console.log(err)
        })
      }

  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
    <div>
      <a href="/">
        <h2 className="font-bold text-3xl">YesFood <span className="bg-[#f84525] text-white px-2 rounded-md"> &#x1F603;</span></h2>
      </a>
    </div>

    <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="py-8">
          <center>
            <span className="text-2xl font-semibold">Forgot Password</span>
          </center>
        </div>

        <div>
          <label className="block font-medium text-sm text-gray-700" htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email" className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]" onChange={ (e) => setEmail(e.target.value)} />
        </div>

        

       

        <div className="flex items-center justify-end mt-4">
         
          
          <button type="submit" className="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
            Send
          </button>
        </div>

      </form>
    </div>
  </div>
  )
}

export default Forgotpassword
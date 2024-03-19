// App.js
import {BrowserRouter , Routes, Route} from "react-router-dom"
import React from 'react';
import SignINForm from './components/SignINForm.jsx';
import SignUp from "./components/SignUp.jsx";
import Home from "./components/Home.jsx";
import Forgotpassword from "./components/Forgotpassword.jsx";
import Cart from "./components/Cart.jsx";
import Logout from "./components/Logout.jsx";
import FeedbackForm from "./components/Feedback.jsx";
import Contact from "./components/Contact.jsx";
import Addfood from "./admincomponents/Addfood.jsx";
import Dashboard from "./admincomponents/Dashboard.jsx";



function App() {
  return (
    <>
      <BrowserRouter>
       <Routes>
         
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/login" element={<SignINForm/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
          <Route path="/feedback" element={<FeedbackForm/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/addfood" element={<Addfood/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          
       </Routes>
      
      </BrowserRouter>
   
    </>
     
    
  );
}

export default App;

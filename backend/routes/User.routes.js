import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.models.js';
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import nodemailer from 'nodemailer'
import { Food_items } from '../models/Food_items.models.js';
import { Order } from '../models/Order.models.js'
import { PlacedOrder } from '../models/Placed_orders.models.js';

dotenv.config()


const Userrouter = express.Router();

Userrouter.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const find = await User.findOne({ email }); // Assuming you want to find a user by email

    if (find) {
        return res.json({ message: "User already exists" });
    }

    try {
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashpassword
        });

        await newUser.save();
        return res.json({ status:true,message: "User Registered" });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


Userrouter.post('/login', async (req,res)=>{

    

    console.log("inside login Page");
    



    const {email,password}=req.body;
    console.log(email)
    console.log(password)
    const userfind=await User.findOne({ email });
    
    if(!userfind){
         console.log(userfind)
         return res.json({message:"The user is not valid"})
    }
    
    const validPassword=await bcrypt.compare(password,userfind.password)
    if(!validPassword){
        return res.json({message:"The entered password is wrong"})
    }
    
    const token = await jwt.sign({username:userfind.username,email:userfind.email},process.env.KEY,{});
    console.log(token)
    res.cookie('token', token, { sameSite: 'None', secure: true })
    console.log("inside login Page - cookie is set")
    const name=userfind.username;
    return res.json({status:true,message:"login success",namex:name});

})

Userrouter.get('/home', async (req, res) => {
  try {
    console.log("inside home page")
    const cards = await Food_items.find();
    console.log("cards are set")
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

Userrouter.post('/order', async (req, res) => {
    try {
      const email = req.body.storedEmail
      const item=req.body.item
      console.log(email)
      // console.log(item)
      //   // const order = new Order({
        //             user: email,
        //             items: [{ product:item }]
        //     });

        // await order.save();
        // res.json({message:"the data is stored"})

        const filter = { user: email };
        const update = { $push: { items: item} };
        const options = { new: true, upsert: true };
      
        const updatedOrder = await Order.findOneAndUpdate(filter, update, options).exec();
        res.json({message:"item is updated in the array"})



    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});





// Backend API to fetch data by email
Userrouter.post('/orders', async (req, res) => {
    try {
     
      const { user } = req.body;
      
      const orders = await Order.findOne({ user: user });
      console.log(orders);
      if(orders==null){ 
        return res.json({status:true,message:"User has no data"});
       }
      // console.log(orders.items);
      const names=[{}]
      for(let i=0;i<orders.items.length;i++){
         const t=await Food_items.findOne({_id:orders.items[i]})
        
         const l={
            name:t.name,
            price:t.price
         }
         names.push(l);
      }
      // console.log(names)
      res.json({ names });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });



 

  const verifyUser = (req, res, next) => {
    try {
      console.log("inside verifyuser-- start");
      console.log(process.env.KEY);
     
      const token = req.cookies.token;
      
      console.log(token)
      if (!token) {
       
        return res.status(401).json({ status: false, message: "No token provided" });
      }
      jwt.verify(token, process.env.KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ status: false, message: "Unauthorized - Invalid token" });
        }
        // Optionally, you can attach the decoded token payload to the request object for later use
        
        next();
      });
    } catch (err) {
      return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };
  

  Userrouter.get("/verify",verifyUser,(req,res)=>{
    console.log("end point of verification");
    return res.json({status:true,message:"authorized"})
  })


  Userrouter.delete('/deleteOrder', async (req, res) => {
    try {
      // Extract user data from the request body
      const { user } = req.body;
      const deletedOrder = await Order.findOneAndDelete({ user });
      // Delete the order entry based on the user
      if (deletedOrder) {
        const { user, items } = deletedOrder;
        const newPlacedOrder = new PlacedOrder({
            name: user,
            items: items,
            status: "Pending"
        });
        await newPlacedOrder.save();
    } else {
        console.log('No order found for the given user.');
    }
      



  
      // Check if any order entry was deleted
      if (deletedOrder.deletedCount === 0) {
        return res.status(404).json({ message: 'No order found for the user' });
      }
  
      // Respond with success message
      res.status(200).json({ message: 'Order entry deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  Userrouter.get('/pending',async (req,res)=>{
          
    try {
      console.log("pending page")
      const pendingorder = await PlacedOrder.find({status:"Pending"});
      console.log(pendingorder)
      console.log("pending orders are set")
      res.json(pendingorder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }


  });

  Userrouter.get('/completed',async (req,res)=>{
          
    try {
      console.log("Completed page")
      const completedorder = await PlacedOrder.find({status:"Completed"});
      console.log(completedorder)
      console.log("Completed are set")
      res.json(completedorder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }


  });


  Userrouter.post('/toComplete',async (req,res)=>{
    const orderId=req.body.orderId;
    console.log(orderId);
    try {
      console.log("To complete page")
      const updatedOrder = await PlacedOrder.findByIdAndUpdate(orderId, { status: 'Completed' }, { new: true });
      console.log('Order updated successfully:', updatedOrder);
      if(updatedOrder){
        res.json({status:true,message : "Order is moved to completed"})
      }else{
         res.json({status:false,message:"Order is not moved"})
      }
     
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }


  });

  Userrouter.post('/todelete',async (req,res)=>{
    const orderId=req.body.orderId;
    console.log(orderId);
    try {
      const deletedOrder = await PlacedOrder.findOneAndDelete({ _id:orderId });
      console.log(deletedOrder)
      
         res.json({message:"The order is deleted"});
      
       
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  });
  Userrouter.post('/toaddfood',async (req,res)=>{
    const orderId=req.body;
   
    try {
      const deletedOrder = await  
      console.log(deletedOrder)
      
         res.json({message:"The order is deleted"});
      
       
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }


  });
  


export { Userrouter };

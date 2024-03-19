import React from "react";
import UserContext from "./UserContext.js";
import { useState } from "react";

const UserContextProvider = ({children})=>{
    
     const [user,setuser]=useState();
    return (
        <UserContext.Provider value={{user,setuser}}>
            
            {children}

        </UserContext.Provider>
    )

}

export default UserContextProvider;
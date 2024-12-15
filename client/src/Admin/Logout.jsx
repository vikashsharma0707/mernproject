
// import { useEffect, useState } from "react";
// import { useNavigate} from "react-router-dom";

// const Logout=()=>{
    
//     const navigate =useNavigate();

  

//     const loout=()=>{
//         localStorage.clear();
//         navigate("/login")
//     }
//     return(
//         <>
        
//         <h1>This is logout page</h1>
       
//         <button onClick={loout}>Logout</button>
//         </>
//     )
// }

// export default Logout


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear(); // Clears the localStorage
        navigate("/login"); // Redirects to login page
    }

    return (
        <>
            <h1>This is the logout page</h1>
            <button onClick={logout}>Logout</button>
        </>
    );
}

export default Logout;

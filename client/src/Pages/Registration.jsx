

// // // import axios from "axios";
// // // import { useState } from "react";

// // // const Registration = () => {
// // //   const [input, setInput] = useState({ username: "", email: "", password: "" });
// // //   const [errors, setErrors] = useState({});
// // //   const [showPassword, setShowPassword] = useState(false);

// // //   const validateForm = () => {
// // //     const newErrors = {};
// // //     if (!input.username) newErrors.username = "Username is required.";
// // //     if (!input.email) newErrors.email = "Email is required.";
// // //     else if (!/\S+@\S+\.\S+/.test(input.email)) newErrors.email = "Invalid email format.";
// // //     if (!input.password) newErrors.password = "Password is required.";
// // //     else if (input.password.length < 6) newErrors.password = "Password must be at least 6 characters long.";
// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleInput = (e) => {
// // //     const { name, value } = e.target;
// // //     setInput((prevInput) => ({ ...prevInput, [name]: value }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!validateForm()) return;

// // //     try {
// // //       const api = "http://localhost:8000/employee/userRegistration";
// // //       await axios.post(api, input);
// // //       alert("Data successfully added");
// // //       setInput({ username: "", email: "", password: "" }); // Clear form after submission
// // //       setErrors({});
// // //     } catch (error) {
// // //       alert("Failed to register. Please try again.");
// // //     }
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <h1>Registration Page</h1>
// // //       <form onSubmit={handleSubmit} style={styles.form}>
// // //         <div style={styles.inputContainer}>
// // //           <label>Enter Name:</label>
// // //           <input
// // //             type="text"
// // //             placeholder="Enter your name"
// // //             name="username"
// // //             value={input.username}
// // //             onChange={handleInput}
// // //             style={styles.input}
// // //           />
// // //           {errors.username && <p style={styles.error}>{errors.username}</p>}
// // //         </div>
        
// // //         <div style={styles.inputContainer}>
// // //           <label>Enter Email:</label>
// // //           <input
// // //             type="email"
// // //             placeholder="Enter your email"
// // //             name="email"
// // //             value={input.email}
// // //             onChange={handleInput}
// // //             style={styles.input}
// // //           />
// // //           {errors.email && <p style={styles.error}>{errors.email}</p>}
// // //         </div>

// // //         <div style={styles.inputContainer}>
// // //           <label>Enter Password:</label>
// // //           <input
// // //             type={showPassword ? "text" : "password"}
// // //             placeholder="Enter your password"
// // //             name="password"
// // //             value={input.password}
// // //             onChange={handleInput}
// // //             style={styles.input}
// // //           />
// // //           <button
// // //             type="button"
// // //             onClick={() => setShowPassword(!showPassword)}
// // //             style={styles.showPasswordButton}
// // //           >
// // //             {showPassword ? "Hide" : "Show"}
// // //           </button>
// // //           {errors.password && <p style={styles.error}>{errors.password}</p>}
// // //         </div>

// // //         <button type="submit" style={styles.submitButton}>Submit</button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // const styles = {
// // //   container: {
// // //     maxWidth: "400px",
// // //     margin: "0 auto",
// // //     padding: "2rem",
// // //     textAlign: "center",
// // //     border: "1px solid #ddd",
// // //     borderRadius: "8px",
// // //     backgroundColor: "#f9f9f9",
// // //   },
// // //   form: {
// // //     display: "flex",
// // //     flexDirection: "column",
// // //     gap: "1rem",
// // //   },
// // //   inputContainer: {
// // //     textAlign: "left",
// // //   },
// // //   input: {
// // //     width: "100%",
// // //     padding: "0.5rem",
// // //     marginTop: "0.5rem",
// // //     borderRadius: "4px",
// // //     border: "1px solid #ccc",
// // //   },
// // //   showPasswordButton: {
// // //     marginTop: "0.5rem",
// // //     fontSize: "0.8rem",
// // //     color: "#0066cc",
// // //     background: "none",
// // //     border: "none",
// // //     cursor: "pointer",
// // //   },
// // //   submitButton: {
// // //     padding: "0.75rem",
// // //     fontSize: "1rem",
// // //     backgroundColor: "#28a745",
// // //     color: "white",
// // //     border: "none",
// // //     borderRadius: "4px",
// // //     cursor: "pointer",
// // //   },
// // //   error: {
// // //     color: "red",
// // //     fontSize: "0.8rem",
// // //   },
// // // };

// // // export default Registration;






// import axios from "axios";
// import { useState } from "react"
// import { useNavigate } from "react-router-dom";



// const Registration=()=>{

//     const [input,setinput] =useState({});
//       const navigate =useNavigate();
//     const handleinput=(e)=>{
//       let name = e.target.name;
//       let value = e.target.value;
//       setinput(values=>({...values,[name]:value}))
//     }

//     const handlesubmit=()=>{
//     let api = "http://localhost:8000/userLog/userRegistration";
//     axios.post(api,input).then((res)=>{
//       alert("data sucessfully added")
//       navigate("/login")

//     })
//     }

    
//     return(
//         <>
        
//         <h2 style={{marginLeft:"100px"}}> Registration page</h2>
//        <div  style={{width:"40%",height:"400px",border:"2px solid black",backgroundColor:"#fff",marginTop:"50px"}}>
//          <h4 style={{width:"100%",backgroundColor:"blue",textAlign:"center"}}>Register Now</h4>
//        <div style={{marginTop:"40px",alignItems:"center",padding:"0px 60px 0px 60px"}}>
//         <h5>Enter name</h5>
//        <input type="text" placeholder="Enter your name"  name="username" value={input.username} onChange={handleinput} style={{width:"80%"}}/><br/><br/>
//        <h5>Enter email</h5>
//         <input type="text" placeholder="Enter your email" name="email" value={input.email} onChange={handleinput} style={{width:"80%"}}/><br/><br/>
//         <h5>Enter password</h5>
//        <input type="text" placeholder="Enter your password"  name="name" value={input.name} onChange={handleinput} style={{width:"80%"}}/><br/><br/>
//         <button onClick={handlesubmit} style={{width:"40%",marginLeft:"80px",backgroundColor:"blue"}}>Submit</button>
//         <p>Already have an account? <Link to={"/login"}>Login here</Link></p>
//        </div>
//        </div>
//         </>
//     )
// }

import { useState } from "react";
import axios from "axios";
import {message} from "antd";
import { Link } from "react-router-dom";
const Registration=()=>{
   const [input, setInput] =useState({});
   const handleInput=(e)=>{
      let name=e.target.name;
      let value=e.target.value;
      setInput(values=>({...values, [name]:value}));
   }
   const handleSubmit=()=>{
    let api="http://localhost:8000/userLog/userRegistration";
     axios.post(api, input).then((res)=>{
        
          message.success("You are succesfully Registered!");
          
     })
   }
    return(
        <>
          <h1> User Registration</h1>
          Enter name : <input type="text" name="name"
          value={input.name} onChange={handleInput} />
          <br/>
          Enter Email : <input type="email" name="email"
          value={input.email} onChange={handleInput} />
          <br/>
          Enter Password : <input type="password" name="password"
          value={input.password} onChange={handleInput} />
          <br/>
          <button onClick={handleSubmit}>Registered!</button>
          <p>Already have an account? <Link to={"/login"}>Login here</Link></p>
        </>
    )
}
export default Registration;
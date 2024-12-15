

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AdminLogin from "../Admin/AdminLogin";  // Assuming this component exists

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // API endpoint to your login route
      let api = "http://localhost:8000/userLog/userLogin";
      const res = await axios.post(api, { email, password });

      // Assuming the response contains the user object with necessary details
      const { _id, name, email: userEmail } = res.data.user;
      
      // Storing user data in localStorage
      localStorage.setItem("userId", _id);
      localStorage.setItem("name", name);
      localStorage.setItem("email", userEmail);

      // Navigate to the user dashboard after successful login
      navigate("/userdashboard");
    } catch (error) {
      // Handling error response from backend
      alert(error.response ? error.response.data : "Login failed. Please try again.");
    }
  };

  return (
    <>
      <h1>User Login</h1>
      <div>
        Enter Email:{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        Enter Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Login</button>
      <p>
        Don't have an account? <Link to="reg">Register here</Link>
      </p>
      
    </>
  );
};

export default UserLogin;

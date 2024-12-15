
import { useState } from 'react';
import { message } from 'antd';
import axios from "axios"
import { useNavigate } from "react-router-dom";





const AdminLogin=()=>{

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("")


    const navigate = useNavigate()

    const handlesubmit = () => {
        const api = "http://localhost:8000/adminUser/userCheck";
        axios.post(api, { user: username, password: password }).then((res) => {
    
          if (res.status == 200) {
            message.success("you are sucessfully login")
            navigate("/admindashboard")
          }
    
          else {
            message.error("response.data.msg")
          }
    
        })
    
      }
    return(
        <>
        
        
            <h4>Admin login form</h4>
            Enter adminname: <input type="text" placeholder="enter adminname" value={username} onChange={(e) => { setusername(e.target.value) }} /><br /><br />
            Enter password: <input type="text" placeholder="enter password" value={password} onChange={(e) => { setpassword(e.target.value) }} /><br /><br />

          
            <button variant="primary" onClick={handlesubmit}>
              Login
            </button>
          
        </>
    )
}

export default AdminLogin;
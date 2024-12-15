

import { Link, Outlet } from "react-router-dom";
import { FaUser, FaUserPlus, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import "../Css/admindashboard.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';

const AdminDashboard = () => {

   const [data,setdata] =useState([]);


   const loaddata=()=>{
      let api="http://localhost:8000/adminuser/userDisplay";
      axios.get(api).then((res)=>{
        setdata(res.data)
      })
   }

   useEffect(()=>{
      loaddata()
   })


   let ans=data.map((key)=>{
      return(
         <>
         <tr>
            <td>{key.name}</td>
            <td>{key.email}</td>
            <td>{key.city}</td>
            <td>{key.category}</td>
            
         </tr>
         
         </>
      )
   })
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="dashboard">
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="displayuser">
                <FaUser /> Display Users
              </Link>
            </li>

            <li>
              <Link to="addtask">
                <FaUser /> Add Task
              </Link>
            </li>
            <li>
              <Link to="adduser">
                <FaUserPlus /> Add User
              </Link>
            </li>
            <li>
              <Link to="add">
                <FaUserPlus /> Add
              </Link>
            </li>
            <li>
              <Link to="displaytask">
                <FaUserPlus /> DisplayTask
              </Link>
            </li>
            <li>
              <Link to="logout">
                <FaSignOutAlt /> Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      

      {/* Main Content */}
      <main className="content">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Here you can manage users, add new users, and handle administrative tasks.</p>
        
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>city</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
      {ans}
      </tbody>
      </Table>
      <Outlet/>
      </main>


    
      
    </div>

    
  );
};

export default AdminDashboard;

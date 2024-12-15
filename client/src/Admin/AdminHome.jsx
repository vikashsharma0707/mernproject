




import { Link, Outlet } from "react-router-dom";
import { FaUser, FaUserPlus, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import "../Css/admindashboard.css"
import { useEffect, useState } from "react";


const AdminHome = () => {

   
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
      

      
      <Outlet/>
      


    
      
    </div>

    
  );
};

export default AdminHome;

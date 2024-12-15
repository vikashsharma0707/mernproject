

import { Link, Outlet } from "react-router-dom";
import { FaUser, FaUserPlus, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import "../Css/admindashboard.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';

const UserHome = () => {

   
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="userdashboard">
                <FaTachometerAlt /> UserDashboard
              </Link>
            </li>
            <li>
              <Link to="userlogout">
                <FaUser /> UserLogout
              </Link>
            </li>

        
          </ul>
        </nav>
      </aside>
      

      
      <Outlet/>



     
      
    </div>

    
  );
};

export default UserHome;

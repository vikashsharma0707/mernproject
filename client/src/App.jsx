import { BrowserRouter, Route, Routes } from "react-router-dom";
import Display from "./Pages/Display";
import InsertTask from "./Pages/InsertTask";
import Page from "./Pages/Page";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Dashboard from "./Pages/Dashboard";
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLayout from "./Admin/AdminLayout";
import DisplayUsers from "./Admin/DisplayUsers";
import AddUsers from "./Admin/AddUsers";
import Logout from "./Admin/Logout";
import AddTask from "./Admin/AddTask";
import UserDashboard from "./Users/UserDashboard";
import UserLogout from "./Users/UserLogout";
import DisplayTask from "./Admin/DisplayTask";
import Detail from "./Admin/Detail";
import Edit from "./Admin/Edit";
import Add from "./Admin/Add";
import UserLogin from "./Users/UserLogin";
import UserTask from "./Users/UserTask";
import UserHome from "./Users/UserHome";






const App=()=>{
  return(
    <>
  
    {/* <InsertTask/>
    <Display/>
    <Page/> */}

<BrowserRouter>
<Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="login" element={<Login/>}/>
  <Route path="reg" element={<Registration/>}/>
  <Route path="dashboard" element={<Dashboard/>}/>
  <Route path="insert" element={<InsertTask />} />
  <Route path="adminlogin" element={<AdminLogin/>}/>
  <Route path="userlogin" element={<UserLogin/>}/>
  
      
    </Routes>


    <Routes>
    
    {/* <Route path="/" element={<AdminHome/>}> */}
    <Route path="admindashboard" element={<AdminDashboard/>}>
    {/* <Route index element={<AdminDashboard/>}/> */}
    <Route path="displayuser" element={<DisplayUsers/>}/>
    <Route path="addtask" element={<AddTask/>}/>
    <Route path="adduser" element={<AddUsers/>}/>
    <Route path="logout" element={<Logout/>}/>
    <Route path="displaytask" element={<DisplayTask/>}/>
    {/* <Route path="detail/:id" element={<Detail/>}/>
    <Route path="edit/:empid" element={<Edit/>}/> */}
     <Route path="add" element={<Add/>}/>
    </Route>
       
    </Routes>

    <Routes>
    
    <Route path="/" element={<UserHome/>}>
    
    <Route index element={<UserDashboard/>}/>
    <Route path="userdashboard" element={<UserDashboard/>}/>
    <Route path="userlogout" element={<UserLogout/>}/>
    <Route path="usertask" element={<UserTask/>}/>
    </Route>
       
    </Routes>
</BrowserRouter>

    </>
  )
}


export default App;
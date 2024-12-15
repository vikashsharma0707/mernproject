import { Link } from "react-router-dom"



const AdminLayout=()=>{
    return(
       <>
       
       <div>
        <div>
          <h4>dashboard</h4>
        </div>

        <div>
            <Link to="Admindashboard">AdminDasboard</Link>
            <Link to="displayuser">DisplayUser</Link>
            <Link to="adduser">Adduser</Link>
            
        </div>
            <Link to="logout">Logout</Link>
        <div>


        </div>
       </div>
       
       </>

    )
}

export default AdminLayout;
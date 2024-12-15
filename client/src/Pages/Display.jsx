import axios from "axios";
import { useEffect, useState } from "react";




const Display=()=>{

    const [data,setdata]=useState([]);

    const loaddata=()=>{
        let api="http://localhost:8000/userTask/userDisplay";
        axios.get(api).then((res)=>{
          setdata(res.data)
        })
    }

    useEffect(()=>{
        loaddata()
    })

    const ans= data.map((key)=>{
        return(
            <>
             <div style={{border:"2px solid black",flexWrap:"wrap",margin:"10px"}} >
                <h5>{key.title}</h5>
                <p>{key.description}</p>
                <h4>{key.dueDate}</h4>
                <h5>{key.status}</h5>
                <p>{key.priority}</p>
                <div>
                    <a href="">
                        <button>Pending</button>
                        <button>Complete</button>
                        <button>Uncomplete</button>
                    </a>
                </div>



                <div>
                    <a href="">
                        <button>Delete</button>
                    </a>
                </div>

                <div>
                    <a href="">
                        <button>Edit</button>
                    </a>
                </div>
             </div>
            
            </>
        )

    })
    return(
        <>
        <h1>this is display data</h1>
        <div style={{width:"150px",display:"flex"}}>
            <div style={{border:"2px solid black"}}>
{ans}
            </div>
        </div>
        
        </>
    )
}

export default Display;


// import axios from "axios";
// import { useEffect, useState } from "react";

// const Display = () => {
//   const [data, setData] = useState([]);

//   // Load data from API
//   const loadData = async () => {
//     const api = "http://localhost:8000/userTask/userDisplay";
//     try {
//       const res = await axios.get(api);
//       setData(res.data);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };

//   // Run loadData only once when component mounts
//   useEffect(() => {
//     loadData();
//   }, []); // Empty dependency array ensures useEffect runs once

//   // Handle delete task
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this task?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:8000/userTask/taskDelete/${id}`);
//       setData(data.filter((task) => task._id !== id)); // Remove the deleted task from the list
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   // Handle edit task (navigate to edit page or open a form)
//   const handleEdit = (id) => {
//     alert(`Edit functionality for task ID: ${id} is under development.`);
//   };

//   // Handle status toggle (if complete, change to uncomplete, if uncomplete, change to complete)
//   const toggleStatus = async (id, currentStatus) => {
//     const newStatus = currentStatus === "complete" ? "uncomplete" : "complete";
//     try {
//       await axios.put(`http://localhost:8000/userTask/taskUpdate/${id}`, { status: newStatus });
//       // Update the status in the local state without reloading the whole data
//       setData((prevData) =>
//         prevData.map((task) => 
//           task._id === id ? { ...task, status: newStatus } : task
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <div className="display-container">
//       <h1>Display Task Data</h1>

//       <div className="task-list">
//         {data.map((task) => (
//           <div className="task-card" key={task._id}>
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>
//             <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
//             <p><strong>Status:</strong> {task.status}</p>
//             <p><strong>Priority:</strong> {task.priority}</p>

//             <div className="button-group">
//               <button 
//                 onClick={() => toggleStatus(task._id, task.status)} 
//                 className={task.status === "complete" ? "uncomplete-button" : "complete-button"}
//               >
//                 {task.status === "complete" ? "Uncomplete" : "Complete"}
//               </button>
//             </div>

//             <div className="button-group">
//               <button onClick={() => handleDelete(task._id)} className="delete-button">Delete</button>
//               <button onClick={() => handleEdit(task._id)} className="edit-button">Edit</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Display;

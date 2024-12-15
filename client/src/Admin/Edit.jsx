


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import axios from "axios";



const Edit=()=>{
    const {empid} = useParams();
    const [input,setinput]=useState({})

    const loaddata=()=>{
      let api="http://localhost:8000/adminuser/taskEdit";
      axios.post(api,{id:empid}).then((res)=>{
        setinput(res.data)
      })
    }

    useEffect(()=>{
        loaddata()
    },[])

 const handledata=(e)=>{
    let name = e.target.name;
    let value= e.target.value;
    setinput(values=>({...values,[name]:value}))
 }


 const handlesubmit=()=>{
    let api="http://localhost:8000/employee/employeeEditsave";
    axios.post(api,input).then((res)=>{
      alert("data updated sucessfully")
    })
 }




return(
    <>
    <h1>This is edit page</h1>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Enter employee number</Form.Label>
        <Form.Control type="text" placeholder="Enter empno"  name="title" value={input.title}  onChange={handledata}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Enter employee name</Form.Label>
        <Form.Control type="text" placeholder="Enter employee name"  name="description" value={input.description}  onChange={handledata} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Enter designation</Form.Label>
        <Form.Control type="text" placeholder="Enter designation" name="duedate" value={input.duedate}   onChange={handledata}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Enter salary</Form.Label>
        <Form.Control type="text" placeholder="Enter Salary" name="status" value={input.status}   onChange={handledata}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Enter salary</Form.Label>
        <Form.Control type="text" placeholder="Enter Salary" name="priority" value={input.priority}   onChange={handledata}/>
      </Form.Group>
      
    </Form>

    <button onClick={handlesubmit}>Submit</button>

    </>
)
}


export default Edit;








// import { useState } from "react";
// import Form from 'react-bootstrap/Form';
// import axios from "axios";



// const AddUsers=()=>{



//     const [input,setinput] = useState({});

//     const handleChange=(e)=>{
//       let name=e.target.name;
//       let value=e.target.value
//       setinput(values=>({...values,[name]:value}))
//       console.log(e.target.value)
//     }


//     const handleSubmit=()=>{
//         let api="http://localhost:8000/userLog/userRegistration";
//         axios.post(api,input).then((res)=>{
//             alert("data send sucessfully")
//         })
    
//         setinput(" ")
        
//       }
    


//     return(
//         <>
//         <h1>This is addusers page</h1>
//         <input type="text" placeholder="enter user name"  name="name"  value={input.value}  onChange={handleChange}/><br/><br/>
//         <input type="text" placeholder="enter email"  name="email"  value={input.email}  onChange={handleChange}/><br/><br/>
//         <input type="text" placeholder="enter user city"  name="city"  value={input.city}  onChange={handleChange}/><br/><br/>
//         <input type="text" placeholder="enter user password"  name="password"  value={input.password}  onChange={handleChange}/><br/><br/>
    
//         <Form.Select aria-label="Default select example" name="category" value={input.category} onChange={handleChange}>
//       <option> Category</option>
//       <option value="mens">Men</option>
//       <option value="womens">women</option>
//       <option value="kids">Kids</option>
//       <option value="all">All</option>
//     </Form.Select><br/><br/>

//     <button  onClick={handleSubmit}>Submit</button>

    
        
//         </>
//     )
// }


// export default AddUsers;

import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
 // Assuming you will create a custom CSS file

const AddUsers = () => {

    const [input, setInput] = useState({});

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = () => {
        let api = "http://localhost:8000/userLog/userRegistration";
        axios.post(api, input).then((res) => {
            alert("Data sent successfully!");
        });

        setInput({});
    };

    return (
        <Container className="form-container">
            <Row className="justify-content-center">
                <Col md={6} lg={4} className="form-column">
                    <h1 className="text-center">Add User</h1>
                    <Form className="user-form">
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter user name" 
                                name="name" 
                                value={input.name || ''} 
                                onChange={handleChange} 
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                name="email" 
                                value={input.email || ''} 
                                onChange={handleChange} 
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter city" 
                                name="city" 
                                value={input.city || ''} 
                                onChange={handleChange} 
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password" 
                                name="password" 
                                value={input.password || ''} 
                                onChange={handleChange} 
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Select 
                                name="category" 
                                value={input.category || ''} 
                                onChange={handleChange}
                                required
                            >
                                <option>Choose category</option>
                                <option value="mens">Men</option>
                                <option value="womens">Women</option>
                                <option value="kids">Kids</option>
                                <option value="all">All</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" onClick={handleSubmit} className="w-100">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddUsers;



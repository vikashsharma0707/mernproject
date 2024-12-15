// import { useParams } from "react-router-dom";



// const Detail=()=>{
//     const {proid} = useParams()


//     const [mydata,setmydata] =useState({});

//     const loaddata=()=>{
//         let api="http://localhost:8000/adminuser/taskDetail";
//         axios.post(api,{id:proid}).then((res)=>{
//            setmydata(res.data)
//         })
//     }

//     useEffect(()=>{
//         loaddata()
//     },[])

//     return(
//         <>
//         <h1>This is detail page</h1>
//         <h1>{mydata.title}</h1>
//         <h1>{mydata.description}</h1>
//         <h1>{mydata.duedate}</h1>
//         <h1>{mydata.status}</h1>
//         <h1>{mydata.priority}</h1>
        
//         </>
//     )
// }
// export default Detail;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // For getting the product ID from the URL

const Detail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the product ID from the URL using useParams
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/adminuser/productDetail/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-detail-container">
      <h2>Product Details</h2>
      {product ? (
        <div className="product-detail">
          <img src={product.imageUrl} alt={product.title} className="product-image" />
          <h3>{product.title}</h3>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Status:</strong> {product.status}</p>
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
};

export default Detail;

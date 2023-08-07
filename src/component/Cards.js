import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../ProductContext';


export default function Cards({products}) {
const { state, dispatch, setShouldRetainCheckoutData } = useContext(CartContext);
const navigate = useNavigate();

if (!products || products.length === 0) {
  return <div>Loading...</div>; // You can show a loading indicator here while data is being fetched
}

const handleCheckout = (item,e) => {
  e.stopPropagation();
  dispatch({type:"CHECKOUT", payload:item});
  setShouldRetainCheckoutData(true)
  navigate("/product/checkout")
}

const handleAddToCart = (item, e) => {
  e.stopPropagation();
  dispatch({type: "ADD_TO_CART", payload: item})
}

return (
  <div className="d-flex flex-wrap container m-auto justify-content-center">
    {products.map((item) => (
      <div onClick={() => navigate(`/product/${item._id}`)} key={item._id} className="card bg-dark m-4 shadow" style={{width:"18rem", cursor:"pointer"}}>

        <div className='bg-white rounded rounded-top' style={{width:"100%"}}>
        <img src={item.img} className="card-img-top" alt="..." style={{ objectFit: "contain", height: "200px", width:"250px", position:"relative"}} />
        </div>

        <div className="card-body">
          <h5 className="card-title text-white">{item.name}</h5>
          <p className="card-text text-white mb-0">{item.description[0].length > 20 ? item.description[0].slice(0,30) + "..." : item.description[0]}</p>
          <p className="mt-0 text-white fw-bold">{item.price}</p>
          <button className="btn btn-primary" onClick={(e) => handleCheckout(item, e)}>Buy Now</button>
          <Link onClick={(e) => {handleAddToCart(item,e)}} className="btn btn-primary mx-3"><i className="bi bi-cart-plus"></i> Add to Cart</Link>
        </div>
      </div>
    ))}
  </div>
);
}

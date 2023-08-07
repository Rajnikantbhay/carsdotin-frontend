import React, { useContext, useState } from "react";
import { CartContext } from "../ProductContext";
import { Link, useNavigate } from "react-router-dom";


export default function Cart() {
  const { state, dispatch } = useContext(CartContext);
  const cartItems = Object.values(state.cart);
  const [ selectedItemIds, setSelectedItemIds ] = useState([]);
  const navigate = useNavigate();

  const handleDecrement = (itemId) => {
    const currentItem = state.cart[itemId];
    if (currentItem.qty > 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { itemId, qty: currentItem.qty - 1 },
      });
    }
  };

  // Function to handle incrementing the quantity for a specific item
  const handleIncrement = (itemId) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { itemId, qty: state.cart[itemId].qty + 1 },
    });
  };

  const handleToggleState = (itemId) => {
    setSelectedItemIds((prevSelectedItemsIds) => {
      // If the item ID is already in the array, remove it; otherwise, add it.
      if (prevSelectedItemsIds.includes(itemId)) {
        return prevSelectedItemsIds.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItemsIds, itemId];
      }
    });
  };
  

  const calculatePrice = () => {
    let totalPrice = 0;
    selectedItemIds.forEach((itemId) => {
      const item = state.cart[itemId];
      if (item) {
        totalPrice += parseInt(item.price.replace(/[^0-9]/g, ""), 10) * item.qty;
      }
    });
    return `Rs. ${totalPrice}`;
  };
  

  const handleCheckout = () => {
    if (!localStorage.getItem("authToken")) {
      alert("Please login");
      navigate("/tologin");
    } else {
      var selectedItems = Object.values(state.cart).filter((item) =>
        selectedItemIds.includes(item._id)
      );
  
      selectedItems.forEach((item) => {
        dispatch({type:"CHECKOUT", payload:item})
        navigate("/product/checkout")
      });
  
      localStorage.removeItem(`userCart_${localStorage.getItem("userEmail")}`);
    }
  };
  
  
  
  if (cartItems.length === 0) {
    return <div className="text-center">
      <img src="/images/emptycart.webp" alt="cart empty"/>
    </div>;
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-center my-2"> 
        {calculatePrice() !== "Rs. 0" ? (<button className="btn btn-primary rounded-0 fs-3" onClick={handleCheckout}>Checkout {calculatePrice()}</button>) : (<button className="btn btn-primary rounded-0 fs-3" disabled >Checkout {calculatePrice()}</button>)}
      </div>
      {cartItems.map((item) => (
        <div className="card mb-3 w-100 p-4 d-flex flex-row align-items-center" key={item._id}>
           <div className="mx-2">
          <input
            type="checkbox"
            checked={selectedItemIds.includes(item._id)}
            onChange={() => handleToggleState(item._id)}
          />
        </div>
          <div className="row g-0">
            <div className="col-md-4 mx-2" style={{ width: "20%" }}>
              <img
                src={item.img}
                className="img-fluid rounded-start h-100 w-100"
                style={{ objectFit: "contain" }}
                alt=""
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <div className="d-inline-block border rounded" >
                  {item.qty ===1 ? (<button className="btn btn-primary fw-bold rounded-0" onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: item})}><i class="bi bi-trash3-fill "></i></button>) : <button onClick={() => handleDecrement(item._id)} className="btn btn-primary fw-bold rounded-0">-</button>}
                    <span className="px-2">{item.qty}</span>
                  <button onClick={() => handleIncrement(item._id)} className="btn btn-primary fw-bold rounded-0" >+</button>
                  </div>
                  <div className="my-2">
                  <Link onClick={() => dispatch({type:"REMOVE_FROM_CART", payload: item})} className="btn btn-danger fw-bold rounded-0">Delete</Link>
                  </div>
              </div>
            </div>
          </div>
        <hr/>
        </div>
        
      ))}
      <hr/>
    </div>
  );
}

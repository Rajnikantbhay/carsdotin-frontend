//checkout.js
import React, { useContext } from 'react'
import { CartContext } from '../ProductContext'

export default function Checkout() {
  const { checkoutData,state } = useContext(CartContext);
  const checkoutItem = Object.values(state.checkoutItems);
  console.log("checkoutItem: ",checkoutItem);

  const totalPrce = () => {
    let result = 0
    checkoutItem.map((item) => {
      let price = item.price;
      let qty = item.qty;

      result += parseInt(price.replace(/[^0-9]/g, ""), 10) * parseInt(qty)
    })

    return result;
  }

  return (
    <div className="p-4">
      <div>Place you order {totalPrce()}</div>
      {checkoutItem.map((item) => (
        <div className="card mb-3 w-100 p-4 d-flex flex-row align-items-center" key={item._id}>
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
                <p className="card-text">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </p>
              </div>
            </div>
          </div>
        <hr/>
        </div>
        
      ))}
      <hr/>
    </div>
  )
}

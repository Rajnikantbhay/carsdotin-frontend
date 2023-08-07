import React, { useContext } from 'react';
import { useParams, Link} from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CartContext } from '../ProductContext';

export default function ProductDetails({ products }) {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  }

  if (product === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container p-5'>
    <div className="card shadow overflow-auto" style={{height:"35rem"}}>
      {/* carousel part */}
      <Carousel infiniteLoop={true} showIndicators={false} showArrows={false} showStatus={false} className='bg-red mw-100 w-50 m-auto'>
          {product.img.map((img, index) => {
          return (
            <div style={{height:"70%", width:"70%", transform:"translateY(40px)"}} className='d-flex justify-content-center align-items-center m-auto' key={index}>
  <         img className="card-img-top h-100 w-100" src={img} alt="Card cap" style={{objectFit:"contain",      width:"auto", transform:"translateX(50)"}} />
            </div>
          )
        })}
  </Carousel>
      {/* carousel part */}
  <div className="card-body">
    <h5 className="card-title fs-2 fw-bold">{product.name}</h5>
    <hr /> 
    <p className="card-text fs-6">{product.description.map((des,index) => {
      return <li key={index}>{des}</li>
    })}</p>
    <div className="card-text">
          <Link className="btn btn-primary">Buy Now</Link>
          <Link className="btn btn-primary mx-3" onClick={handleAddToCart}><i className="bi bi-cart-plus"></i> Add to Cart</Link>
          <select aria-label="Default select example">
            {Array.from({length : 4}, (_, index) => {
              return <option key={index} >{ index +1 }</option>
            })}
          </select>
    </div>
  </div>
</div>
</div>
  );
}

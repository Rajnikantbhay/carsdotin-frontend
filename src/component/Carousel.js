import React from 'react'

export default function Carousel() {
  return (
    <div>
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner" style={{maxHeight: "500px"}}>
    <div className="carousel-item active">
      <img src="/images/3.jpg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="/images/2.jpg" className="d-block w-100" alt="..." style={{maxHeight:"500px", height:"100%", width:"100%", objectFit:"cover"}} />
    </div>
    <div className="carousel-item">
      <img src="/images/5.jpg" className="d-block w-100" alt="..." style={{maxHeight:"500px", height:"100%", width:"100%", objectFit:"cover"}} />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

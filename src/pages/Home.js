import React from 'react'
import Carousel from '../component/Carousel'
import Cards from '../component/Cards'

export default function Home({products}) {
  return (
    <div>
      <Carousel />
      <Cards products={products}/>
    </div>
  )
}

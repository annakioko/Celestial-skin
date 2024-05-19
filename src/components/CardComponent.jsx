import React, { useState } from 'react'

export const CardComponent = ({ product }) => {
  const [quantity, setQunatitiy] = useState(1);


  return (
    <div className='product-card'>
      <img src={product.image} />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product, quantity)}> ADD TO CART</button>

    </div>
  );
};


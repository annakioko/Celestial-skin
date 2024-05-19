import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDescription = () => {
  const { productId } = useParams();
  const [mainImage, setMainImage] = useState("");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://127.0.0.1:5500/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.images[0]); 
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [productId]);

  const handleImageClick = (src) => {
    setMainImage(src);
  };

  const handleAddToCart = () => {
    fetch("http://127.0.0.1:5500/orderItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId: product.id,
        quantity: quantity,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error adding to cart");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Added to cart:", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-light-mode min-h-screen p-4">
      <div className="container mx-auto flex flex-col md:flex-row">
        <div className="left md:w-1/2">
          <div className="main_image mb-4">
            <img
              src={mainImage}
              alt="Main"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="option flex flex-wrap gap-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Option ${index + 1}`}
                onClick={() => handleImageClick(image)}
                className="cursor-pointer w-20 h-20 object-cover"
              />
            ))}
          </div>
        </div>
        <div className="right md:w-1/2 md:pl-8">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <h4 className="text-lg font-semibold my-2">
            <small>$</small>
            {product.price}
          </h4>
          <p className="mb-4">{product.description}</p>
          <h5 className="font-semibold mb-2">Color-Rose Gold</h5>
          <div className="color flex space-x-2 mb-4">
            <span className="w-6 h-6 bg-gray-200 rounded-full"></span>
            <span className="w-6 h-6 bg-gray-400 rounded-full"></span>
            <span className="w-6 h-6 bg-gray-600 rounded-full"></span>
            <span className="w-6 h-6 bg-gray-800 rounded-full"></span>
            <span className="w-6 h-6 bg-red-500 rounded-full"></span>
            <span className="w-6 h-6 bg-blue-500 rounded-full"></span>
            <span className="w-6 h-6 bg-green-500 rounded-full"></span>
          </div>
          <div className="add flex items-center space-x-4 mb-4">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="w-8 h-8 flex items-center justify-center border rounded"
            >
              -
            </button>
            <label className="text-lg">{quantity}</label>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center border rounded"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-dark-mode text-black p-1 rounded-xl font-bold  md:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;

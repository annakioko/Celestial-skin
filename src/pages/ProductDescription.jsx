import React, { useState } from "react";

const ProductDetail = () => {
  const product = {
    name: "Soft Matte Lip Colour",
    gender: "Woman",
    description:
      "Luxurious, velvety, long-lasting shades for irresistible lips",
    price: 1000,
    quantity_available: 50,
    image: "https://unsplash.com/photos/beige-becca-lipstick-jaV6cvSEqao",
    category: "Makeup",
  };

  const [mainImage, setMainImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);

  const handleImageClick = (src) => {
    setMainImage(src);
  };

  const handleQuantityChange = (type) => {
    if (type === "increase" && quantity < product.quantity_available) {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-[#C1908B] p-4">
      <div className="container mx-auto flex flex-col md:flex-row bg-white shadow-lg">
        <div className="left flex-1 p-4">
          <div className="main_image">
            <img src={mainImage} alt={product.name} className="w-full h-auto" />
          </div>
          <div className="option flex mt-4">
            <img
              src={product.image}
              alt=""
              className="w-16 h-16 p-2 cursor-pointer"
              onClick={() => handleImageClick(product.image)}
            />
            {/* Add more images here similarly */}
          </div>
        </div>
        <div className="right flex-1 p-8">
          <h3 className="text-2xl text-[#af827d] mb-4">{product.name}</h3>
          <h4 className="text-red-600 mb-4">
            <small>$</small>
            {product.price}
          </h4>
          <p className="text-[#837D7C] mb-8">{product.description}</p>
          <h5 className="text-[#837D7C] mb-2">Color-Rose Gold</h5>
          <div className="color flex mb-8">
            <span className="w-6 h-6 bg-black rounded-full mr-2"></span>
            <span className="w-6 h-6 bg-[#EDEDED] rounded-full mr-2"></span>
            <span className="w-6 h-6 bg-[#D5D6D8] rounded-full mr-2"></span>
            <span className="w-6 h-6 bg-[#EFE0DE] rounded-full mr-2"></span>
            <span className="w-6 h-6 bg-[#AB8ED1] rounded-full mr-2"></span>
            <span className="w-6 h-6 bg-[#F04D44] rounded-full"></span>
          </div>
          <h5 className="text-[#837D7C] mb-2">Number</h5>
          <div className="add flex items-center mb-8">
            <button
              className="w-8 h-8 border border-[#C1908B] text-[#C1908B] rounded-full flex justify-center items-center"
              onClick={() => handleQuantityChange("decrease")}
            >
              -
            </button>
            <label className="w-12 text-center">{quantity}</label>
            <button
              className="w-8 h-8 border border-[#C1908B] text-[#C1908B] rounded-full flex justify-center items-center"
              onClick={() => handleQuantityChange("increase")}
            >
              +
            </button>
          </div>
          <button className="w-full py-2 bg-[#C1908B] text-white rounded-full mt-8">
            Add to Bag
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

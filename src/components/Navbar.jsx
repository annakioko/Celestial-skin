import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#A6603A", minHeight: "5vh" }}>
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-start p-4">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold">Celestial Skins</h1>
          <p>Beauty Shop</p>
        </div>
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <h3 className="font-bold mb-2">ABOUT US</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contactus">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <h3 className="font-bold mb-2">SHOP</h3>
          <ul>
            <li className="mb-1">
              <Link to="/scents" className="hover:underline">
                Scents
              </Link>
            </li>
            <li className="mb-1">
              <Link to="/makeup" className="hover:underline">
                Makeup
              </Link>
            </li>
            <li>
              <Link to="/skincare" className="hover:underline">
                Skin Care
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-auto">
          <h3 className="font-bold mb-2">ADDRESS</h3>
          <p>Ngong Lane</p>
          <p>0720856222</p>
          <p>Celestialskin@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

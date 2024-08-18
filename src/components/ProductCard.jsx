'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ id, name, price, description, image }) => {
  // Access cart state and addToCart function from CartContext
  const { addToCart, cart } = useCart();
  
  // State to manage success message display
  const [successMessage, setSuccessMessage] = useState('');

  // Check if the current product is already in the cart
  const isInCart = cart.some(item => item.id === id);

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    addToCart(id); // Add the product to the cart
    setSuccessMessage('Added to cart successfully!'); // Set success message
    
    // Clear success message after a few seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      {/* Product image */}
      <Image 
        src={image} 
        alt={name} 
        width={300} 
        height={300} 
        className="w-full h-96 object-cover mb-4" 
      />
      {/* Product name */}
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      {/* Product description */}
      <p className="text-gray-600 mb-2">{description}</p>
      {/* Product price */}
      <p className="text-lg font-bold mb-4">${price.toFixed(2)}</p>

      {/* Display success message when item is added to the cart */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      {/* Conditional rendering based on whether the product is in the cart */}
      {!isInCart ? (
        // Button to add product to cart if not already in the cart
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex justify-between items-center">
          {/* Button to add more of the same product to the cart */}
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add More
          </button>
          {/* Link to view the cart */}
          <Link href="/cart" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
            View Cart
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

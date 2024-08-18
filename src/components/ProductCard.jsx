'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const ProductCard = ({ id, name, price, description, image, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(id);
    setIsAdded(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Image src={image} alt={name} width={300} height={300} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-lg font-bold mb-4">${price.toFixed(2)}</p>
      {!isAdded ? (
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
      ) : (
        <Link href="/cart" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Go to Cart
        </Link>
      )}
    </div>
  );
};

export default ProductCard;
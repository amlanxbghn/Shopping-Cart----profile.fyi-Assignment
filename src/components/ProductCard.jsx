'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const ProductCard = ({ id, name, price, description, image }) => {
  const { addToCart, cart } = useCart();

  const isInCart = cart.some(item => item.id === id);

  const handleAddToCart = () => {
    addToCart(id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Image src={image} alt={name} width={300} height={300} className="w-full h-96 object-cover mb-4" />
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-lg font-bold mb-4">${price.toFixed(2)}</p>
      {!isInCart ? (
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex justify-between items-center">
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add More
          </button>
          <Link href="/cart" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
            View Cart
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
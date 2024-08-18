'use client';

import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { getTotalItems } = useCart();

  return (
    <Link href="/cart" className="flex items-center">
      <div className="relative">
        <FaShoppingCart className="text-2xl" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {getTotalItems()}
        </span>
      </div>
    </Link>
  );
};

export default CartIcon;
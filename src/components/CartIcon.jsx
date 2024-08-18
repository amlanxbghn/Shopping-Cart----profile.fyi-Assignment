'use client';

import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  // Access the getTotalItems function from CartContext to get the number of items in the cart
  const { getTotalItems } = useCart();

  return (
    <Link href="/cart" className="flex items-center">
      {/* Container for the cart icon and item count badge */}
      <div className="relative">
        {/* Shopping cart icon */}
        <FaShoppingCart className="text-2xl" />
        {/* Badge displaying the total number of items in the cart */}
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {getTotalItems()}
        </span>
      </div>
    </Link>
  );
};

export default CartIcon;

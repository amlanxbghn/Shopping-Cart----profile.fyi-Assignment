'use client';

import { useState } from 'react';
import Link from 'next/link';
import productsData from '../../data/products.json';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';

export default function Cart() {
  const { cart, updateQuantity, removeItem } = useCart();
  const [discount, setDiscount] = useState(0);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const product = productsData.find((p) => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const applyDiscount = (e) => {
    e.preventDefault();
    const discountCode = e.target.elements.discountCode.value;
    if (discountCode === 'SAVE10') {
      setDiscount(10);
    } else if (discountCode === 'SAVE20') {
      setDiscount(20);
    } else {
      setDiscount(0);
      alert('Invalid discount code');
    }
  };

  const handleCheckout = () => {
    setCheckoutMessage('Checkout successful! Thank you for your purchase.');
  };

  const subtotal = calculateSubtotal();
  const total = subtotal - discount;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {checkoutMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{checkoutMessage}</span>
        </div>
      )}
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/" className="text-blue-500 hover:underline">Go shopping</Link></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cart.map((item) => {
              const product = productsData.find((p) => p.id === item.id);
              if (!product) return null;
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  product={product}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              );
            })}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
            <div className="bg-gray-100 p-4 rounded">
              <p className="mb-2">Subtotal: ${subtotal.toFixed(2)}</p>
              <p className="mb-2">Discount: ${discount.toFixed(2)}</p>
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              <form onSubmit={applyDiscount} className="mt-4">
                <input
                  type="text"
                  name="discountCode"
                  placeholder="Enter discount code"
                  className="w-full p-2 border rounded mb-2"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Apply Discount
                </button>
              </form>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mt-4"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
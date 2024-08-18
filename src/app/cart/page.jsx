'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import productsData from '../../data/products.json';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, removeItem } = useCart();
  const [discount, setDiscount] = useState(0);

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

  const subtotal = calculateSubtotal();
  const total = subtotal - discount;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your Cart is Empty. <Link href="/" className="text-blue-500 hover:underline">Start Shopping</Link></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cart.map((item) => {
              const product = productsData.find((p) => p.id === item.id);
              if (!product) return null;
              return (
                <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
                  <Image src={product.image} alt={product.name} width={80} height={80} className="object-cover mr-4" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 px-2 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 px-2 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
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
                onClick={() => alert('Checkout functionality not implemented')}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mt-4"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
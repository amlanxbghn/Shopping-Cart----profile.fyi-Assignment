'use client';

import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsData.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </main>
  );
}
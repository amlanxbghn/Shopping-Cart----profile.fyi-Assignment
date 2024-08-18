'use client';

import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';

export default function Home() {
  // Extract addToCart function from CartContext
  const { addToCart } = useCart();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Products</h1>
      
      {/* Grid layout for displaying product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Map through productsData and render a ProductCard for each product */}
        {productsData.map((product) => (
          <ProductCard
            key={product.id}
            {...product} // Spread operator to pass individual product properties
            onAddToCart={addToCart} // Pass addToCart function to ProductCard
          />
        ))}
      </div>
    </main>
  );
}

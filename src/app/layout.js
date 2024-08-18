import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { CartProvider } from '../context/CartContext';
import CartIcon from '../components/CartIcon';

// Load Inter font with Latin subset for consistent styling across the app
const inter = Inter({ subsets: ['latin'] });

// Metadata for the application
export const metadata = {
  title: 'E-commerce Shopping Cart',
  description: 'A simple e-commerce shopping cart application',
};

// RootLayout component to define the global layout and structure
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the entire application in CartProvider for cart context */}
        <CartProvider>
          {/* Header section of the application */}
          <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              {/* Navigation link to the homepage */}
              <Link href="/" className="text-2xl font-bold">
                E-commerce Store
              </Link>
              {/* CartIcon component displaying cart status */}
              <CartIcon />
            </div>
          </header>
          {/* Render the main content of the application */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { CartProvider } from '../context/CartContext';
import CartIcon from '../components/CartIcon';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E-commerce Shopping Cart',
  description: 'A simple e-commerce shopping cart application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">
                E-commerce Store
              </Link>
              <CartIcon />
            </div>
          </header>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
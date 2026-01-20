'use client';

import { useCart } from '@/lib/cart-context';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onCartClick?: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
          </div>
          <span className="font-bold text-xl text-foreground">MarketFinder</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-foreground hover:text-primary text-sm font-medium">
            How it Works
          </Link>
          <a href="#" className="text-foreground hover:text-primary text-sm font-medium">
            Support
          </a>
          <Link href="#" className="text-foreground hover:text-primary text-sm font-medium">
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/auth" className="hidden md:inline-block px-6 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition">
            Contact Us
          </Link>
          <button
            onClick={onCartClick}
            className="relative p-1 hover:bg-muted rounded transition md:block hidden"
          >
            <ShoppingCart className="w-6 h-6 text-foreground hover:text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

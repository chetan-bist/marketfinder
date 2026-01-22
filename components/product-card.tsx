'use client';

import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden flex flex-col h-full hover:shadow-lg transition">
        <div className="relative group overflow-hidden bg-gray-100 aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <div
              className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold text-white ${
                product.badge === 'IN STOCK'
                  ? 'bg-primary'
                  : 'bg-orange-500'
              }`}
            >
              {product.badge}
            </div>
          )}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition"
          >
            <Heart
              className="w-5 h-5"
              fill={isWishlisted ? 'currentColor' : 'none'}
              color={isWishlisted ? '#e74c3c' : '#999'}
            />
          </button>
        </div>

        <div className="flex flex-col flex-grow p-4">
          <h3 className="font-semibold text-foreground text-base line-clamp-2">
            {product.name}
          </h3>
          <p className="text-primary font-bold text-lg mt-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            {product.shop}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
          disabled={isAdding}
          className="m-4 mt-0 w-auto px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-75"
        >
          <ShoppingCart className="w-5 h-5" />
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
}

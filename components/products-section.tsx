'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

export function ProductsSection() {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const products: Product[] = [
    {
      id: '1',
      name: 'Fresh Organic Tomatoes',
      price: 4.99,
      image: '/images/Fresh-Organic-Tomatoes.jpg',
      market: 'Central Farmers Market',
      category: 'Produce',
      availability: 'In Stock',
    },
    {
      id: '2',
      name: 'Artisan Bread Loaf',
      price: 6.99,
      image: '/images/Artisan-Bread-Loaf.jpg',
      market: 'Community Market',
      category: 'Bakery',
      availability: 'In Stock',
    },
    {
      id: '3',
      name: 'Local Honey Jar',
      price: 12.99,
      image: '/images/Local-Honey-Jar.jpg',
      market: 'Riverside Market',
      category: 'Specialty',
      availability: 'In Stock',
    },
    {
      id: '4',
      name: 'Fresh Mixed Greens',
      price: 3.99,
      image: '/images/Fresh-Mixed-Greens.jpg',
      market: 'Central Farmers Market',
      category: 'Produce',
      availability: 'In Stock',
    },
    {
      id: '5',
      name: 'Handmade Cheese',
      price: 14.99,
      image: '/images/Handmade-Cheese.jpg',
      market: 'Artisan Market',
      category: 'Dairy',
      availability: 'In Stock',
    },
    {
      id: '6',
      name: 'Fresh Cut Flowers',
      price: 8.99,
      image: '/images/Fresh-Cut-Flowers.jpg',
      market: 'Corner Market',
      category: 'Flowers',
      availability: 'In Stock',
    },
  ];

  const getQuantity = (productId: string) => quantities[productId] || 1;

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta),
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = getQuantity(product.id);
    addToCart(product, quantity);
    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
  };

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Featured Products
          </h2>
          <p className="text-muted-foreground">
            Popular items available in local markets right now
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.market}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {product.availability}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 bg-muted rounded p-2">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      className="p-1 hover:bg-white rounded transition"
                    >
                      <Minus className="w-4 h-4 text-foreground" />
                    </button>
                    <span className="font-semibold text-foreground w-8 text-center">
                      {getQuantity(product.id)}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="p-1 hover:bg-white rounded transition"
                    >
                      <Plus className="w-4 h-4 text-foreground" />
                    </button>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { CartSidebar } from '@/components/cart-sidebar';
import { ProductCard } from '@/components/product-card';
import { ProductFilters, FilterState } from '@/components/product-filters';
import { Product } from '@/lib/types';
import { CartProvider } from '@/lib/cart-context';
import { X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Loading from './loading'; // Import the loading component
import { Suspense } from 'react'; // Import Suspense

// Mock product data
const ALL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Coastal Azure Mug',
    price: 32.0,
    image: '/images/coastal-azure-mug.jpg',
    market: 'Green Valley Market',
    category: 'Artisan Ceramics',
    availability: 'In Stock',
    shop: 'Green Valley Pottery',
    badge: 'IN STOCK',
    sizes: ['Small (S)', 'Medium (M)'],
    colors: ['Teal', 'Blue'],
  },
  {
    id: '2',
    name: 'Speckled Grain Bowls',
    price: 48.0,
    image: '/images/speckled-grain-bowls.jpg',
    market: 'Green Valley Market',
    category: 'Artisan Ceramics',
    availability: 'In Stock',
    shop: 'The Clay Studio',
    badge: 'MARKET FAVORITE',
    sizes: ['Small (S)'],
    colors: ['Gray'],
  },
  {
    id: '3',
    name: 'Minimalist Bud Vase',
    price: 24.0,
    image: '/images/minimalist-bud-vase.jpg',
    market: 'Green Valley Market',
    category: 'Artisan Ceramics',
    availability: 'In Stock',
    shop: 'Earth & Fire Shop',
    badge: 'IN STOCK',
    sizes: ['Small (S)', 'Medium (M)', 'Large (L)'],
    colors: ['Teal', 'Orange'],
  },
  {
    id: '4',
    name: 'Terracotta Plate',
    price: 19.5,
    image: '/images/terracotta-plate.jpg',
    market: 'Green Valley Market',
    category: 'Artisan Ceramics',
    availability: 'In Stock',
    shop: 'Green Valley Pottery',
    badge: 'IN STOCK',
    sizes: ['Medium (M)', 'Large (L)'],
    colors: ['Orange'],
  },
  {
    id: '5',
    name: 'Handmade Pitcher',
    price: 45.0,
    image: '/images/handmade-pitcher.jpg',
    market: 'Green Valley Market',
    category: 'Artisan Ceramics',
    availability: 'In Stock',
    shop: 'The Clay Studio',
    sizes: ['Medium (M)'],
    colors: ['Teal', 'Blue'],
  },
  {
    id: '6',
    name: 'Artisan Platter',
    price: 65.0,
    image: '/images/artisan-platter.jpg',
    market: 'Green Valley Market',
    category: 'Artisan Ceramics',
    availability: 'In Stock',
    shop: 'Earth & Fire Shop',
    badge: 'MARKET FAVORITE',
    sizes: ['Large (L)'],
    colors: ['Orange', 'Gray'],
  },
  {
    id: '7',
    name: 'Glazed Bowl Set',
    price: 55.0,
    image: '/images/glazed-bowl-set.jpg',
    market: 'Green Valley Market',
    category: 'Artisan Ceramics',
    availability: 'In Stock',
    shop: 'Green Valley Pottery',
    sizes: ['Small (S)', 'Medium (M)', 'Large (L)',],
    colors: ['Blue'],
  },
  {
    id: '8',
    name: 'Modern Vase',
    price: 38.0,
    image: '/images/modern-vase.jpg',
    market: 'Green Valley Market',
    category: 'Artisan Ceramics',
    availability: 'In Stock',
    shop: 'The Clay Studio',
    badge: 'IN STOCK',
    sizes: ['Medium (M)', 'Large (L)'],
    colors: ['Teal'],
  },
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || 'Artisan Ceramics';
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);
  const [filters, setFilters] = useState<FilterState>({
    inStockOnly: false,
    priceRange: [15, 85],
    sizes: [],
    colors: [],
  });
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>(
    'featured'
  );

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const matchesQuery = product.category
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const matchesStock = !filters.inStockOnly || product.availability === 'In Stock';
      const matchesSizes =
        filters.sizes.length === 0 ||
        filters.sizes.some((size) => product.sizes?.includes(size));
      const matchesColors =
        filters.colors.length === 0 ||
        filters.colors.some((color) => product.colors?.includes(color));

      return (
        matchesQuery &&
        matchesPrice &&
        matchesStock &&
        matchesSizes &&
        matchesColors
      );
    });
  }, [query, filters]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  const displayedProducts = sortedProducts.slice(0, displayCount);
  const hasMore = displayCount < sortedProducts.length;

  const activeFilters = [];
  if (filters.priceRange[0] > 15 || filters.priceRange[1] < 85) {
    activeFilters.push({
      label: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`,
      onRemove: () =>
        setFilters({ ...filters, priceRange: [15, 85] }),
    });
  }
  activeFilters.push({
    label: 'Artisan Shop',
    onRemove: () => console.log('Remove shop filter'),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setIsCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {query}
          </h1>
          <p className="text-muted-foreground">
            {sortedProducts.length} products found in{' '}
            <span className="font-semibold">Green Valley Market</span>
          </p>
        </div>

        <div className="flex gap-8">
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClear={() =>
              setFilters({
                inStockOnly: false,
                priceRange: [15, 85],
                sizes: [],
                colors: [],
              })
            }
          />

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-border"
                  >
                    <span className="text-sm text-foreground">{filter.label}</span>
                    <button
                      onClick={filter.onRemove}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'featured' | 'price-low' | 'price-high')
                }
                className="text-sm font-semibold text-foreground border border-border rounded px-3 py-2"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {displayedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No products found matching your filters.
                </p>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <p className="text-muted-foreground text-sm">
                  You've viewed {displayCount} of {sortedProducts.length} products
                </p>
                {hasMore && (
                  <button
                    onClick={() => setDisplayCount((prev) => prev + 12)}
                    className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition"
                  >
                    Load More Products
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <CartProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchPageContent />
      </Suspense>
    </CartProvider>
  );
}

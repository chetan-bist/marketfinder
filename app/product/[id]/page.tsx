'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { CartProvider, useCart } from '@/lib/cart-context';
import { CartSidebar } from '@/components/cart-sidebar';
import { InquirySidebar } from '@/components/inquiry-sidebar';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Clock, Share2, Plus, Minus, CheckCircle } from 'lucide-react';

const MOCK_PRODUCT = {
  id: '1',
  name: 'Organic Gala Apples',
  price: 4.50,
  unit: '/kg',
  image: '/images/apple.jpg',
  images: [
    '/images/apple.jpg',
    '/images/apple.jpg',
    '/images/apple.jpg',
    '/images/apple.jpg',
  ],
  market: 'Green Valley Market',
  category: 'Fruits & Vegetables',
  availability: 'In Stock',
  shop: 'Green Valley Farm',
  shopId: '1',
  badge: 'IN STOCK' as const,
  rating: 4.9,
  reviewCount: 324,
  description: 'These Organic Gala apples are sourced directly from the Green Valley Orchards, just 12 miles from the city center. Known for their mild, sweet flavor and crisp texture, they are perfect for snacking, salads, or baking',
  features: [
    'Certified Organic (No pesticides)',
    'Harvested within the last 48 hours',
    'High fiber and Vitamin C content',
    'Eco-friendly minimal packaging available',
  ],
  tags: ['LOCALLY SOURCED', 'ZERO PLASTIC'],
};

const MOCK_SHOP = {
  id: '1',
  name: 'Green Valley Farm',
  vendorSince: 2018,
  address: '124 Market St, West End',
  distance: 2.4,
  hours: 'Open until 6:00 PM',
  isTrusted: true,
  mapUrl: 'https://maps.google.com',
};

const MOCK_RELATED_PRODUCTS = [
  {
    id: '2',
    name: 'Bartlett Pears',
    price: 3.20,
    unit: '/kg',
    image: '/images/Bartlett-Pears.jpg',
    shop: 'Green Valley Farm',
  },
  {
    id: '3',
    name: 'Russet Potatoes',
    price: 1.50,
    unit: '/kg',
    image: '/images/Russet-Potatoes.jpg',
    shop: 'Green Valley Farm',
  },
  {
    id: '4',
    name: 'Garden Carrots',
    price: 2.10,
    unit: '/lb',
    image: '/images/Garden-Carrots.jpg',
    shop: 'Green Valley Farm',
  },
  {
    id: '5',
    name: 'Artisan Sourdough',
    price: 5.50,
    unit: '/ea',
    image: '/images/Artisan-Sourdough.jpg',
    shop: 'Green Valley Farm',
  },
];

function ProductDetailContent() {
  const { addToCart, addToInquiry } = useCart();
  const [quantity, setQuantity] = useState(2);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToList, setIsAddedToList] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const handleAddToInquiry = () => {
    addToInquiry(MOCK_PRODUCT as any, quantity);
    setIsAddedToList(true);
    setTimeout(() => setIsAddedToList(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} onInquiryClick={() => setIsInquiryOpen(true)} />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/search?q=Fruits" className="text-primary hover:underline">
            Fruits & Vegetables
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{MOCK_PRODUCT.name}</span>
        </div>
      </div>

      {/* Notification */}
      {isAddedToList && (
        <div className="bg-blue-50 border border-blue-200 max-w-6xl mx-auto px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-600">Organic Gala Apples added</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Product Images */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg overflow-hidden relative">
            <div className="relative w-full pb-[100%]">
              <Image
                src={MOCK_PRODUCT.images?.[selectedImage] || MOCK_PRODUCT.image}
                alt={MOCK_PRODUCT.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Wishlist Heart */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition"
            >
              <Heart
                className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
              />
            </button>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-2 mt-4">
            {MOCK_PRODUCT.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-20 h-20 rounded border-2 overflow-hidden transition ${
                  selectedImage === idx ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <Image src={img || "/placeholder.svg"} alt={`View ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Product Description */}
          <div className="mt-8 bg-white rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Product Description</h3>
            <p className="text-muted-foreground mb-4">{MOCK_PRODUCT.description}</p>
            <ul className="space-y-2 mb-6">
              {MOCK_PRODUCT.features?.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary text-lg leading-none">•</span>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              {MOCK_PRODUCT.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-700 border-0">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* More from this Market */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">More from this Market</h3>
              <Link href={`/search?q=${MOCK_PRODUCT.market}`} className="text-primary hover:underline">
                View all items →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {MOCK_RELATED_PRODUCTS.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group"
                >
                  <div className="relative w-full pb-[100%] bg-gray-900 rounded-lg overflow-hidden mb-2">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-sm">
                      ${product.price}
                      <span className="text-muted-foreground text-xs font-normal">{product.unit}</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product as any, 1);
                      }}
                      className="text-primary hover:bg-blue-50 p-1 rounded transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Info & Shop */}
        <div className="space-y-6">
          {/* Product Info Card */}
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary text-white">{MOCK_PRODUCT.availability}</Badge>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold">
                      {MOCK_PRODUCT.rating}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      ({MOCK_PRODUCT.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold">{MOCK_PRODUCT.name}</h1>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-4xl font-bold text-primary">
                ${MOCK_PRODUCT.price}
                <span className="text-lg font-normal text-muted-foreground ml-1">
                  {MOCK_PRODUCT.unit}
                </span>
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="pt-4 border-t">
              <label className="block text-sm font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-4 bg-muted p-2 rounded w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-primary hover:bg-background p-1 rounded transition"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-primary hover:bg-background p-1 rounded transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Inquiry List Button */}
            <button
              onClick={handleAddToInquiry}
              className="w-full bg-primary text-white font-semibold py-3 rounded-full hover:bg-primary/90 transition flex items-center justify-center gap-2"
            >
              Add to Inquiry List
            </button>

            {/* Share Product */}
            <button className="w-full border border-border text-foreground font-semibold py-3 rounded-full hover:bg-muted transition flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Product
            </button>
          </div>

          {/* Shop Info Card */}
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold">{MOCK_SHOP.name}</h3>
                <p className="text-sm text-primary">Trusted Vendor Since {MOCK_SHOP.vendorSince}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p>{MOCK_SHOP.address}</p>
                  <p className="text-muted-foreground">{MOCK_SHOP.distance} miles from you</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-foreground">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{MOCK_SHOP.hours}</span>
              </div>
            </div>

            {/* Map Preview */}
            <div className="w-full h-32 bg-gray-200 rounded-lg relative overflow-hidden">
              <Image
                src="/images/map.jpg"
                alt="Map"
                fill
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Contact Shop Button */}
            <button className="w-full bg-blue-50 text-primary font-semibold py-3 rounded-full hover:bg-blue-100 transition">
              Contact Shop
            </button>
          </div>
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <InquirySidebar isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </div>
  );
}

export default function ProductPage() {
  return (
    <CartProvider>
      <ProductDetailContent />
    </CartProvider>
  );
}

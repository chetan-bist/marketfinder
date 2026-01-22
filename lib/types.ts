export interface Shop {
  id: string;
  name: string;
  vendorSince: number;
  address: string;
  distance: number;
  hours: string;
  isTrusted?: boolean;
  mapUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  market: string;
  category: string;
  availability: string;
  shop: string;
  shopId?: string;
  badge?: 'IN STOCK' | 'MARKET FAVORITE';
  sizes?: string[];
  colors?: string[];
  rating?: number;
  reviewCount?: number;
  description?: string;
  features?: string[];
  tags?: string[];
  unit?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface InquiryItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
  inquiryItems: InquiryItem[];
  addToInquiry: (product: Product, quantity: number) => void;
  removeFromInquiry: (productId: string) => void;
  getTotalInquiryItems: () => number;
}

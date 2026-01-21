export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  market: string;
  category: string;
  availability: string;
  shop: string;
  badge?: 'IN STOCK' | 'MARKET FAVORITE';
  sizes?: string[];
  colors?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}

'use client';

import { useCart } from '@/lib/cart-context';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface InquirySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InquirySidebar({ isOpen, onClose }: InquirySidebarProps) {
  const { inquiryItems, removeFromInquiry, getTotalInquiryItems } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 z-50 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Inquiry List</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          {inquiryItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground font-medium mb-2">No items in your inquiry list</p>
              <p className="text-sm text-muted-foreground">Add products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {inquiryItems.map((item) => (
                <div
                  key={item.product.id}
                  className="border border-border rounded-lg p-3 flex gap-3"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.product.id}`}
                      className="font-semibold text-sm line-clamp-2 hover:text-primary transition"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-primary font-bold text-sm mt-1">
                      ${item.product.price.toFixed(2)}
                      {item.product.unit && (
                        <span className="text-muted-foreground font-normal text-xs">
                          {item.product.unit}
                        </span>
                      )}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromInquiry(item.product.id)}
                    className="text-destructive hover:bg-red-50 p-2 rounded transition flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Items:</span>
                  <span className="font-bold">{getTotalInquiryItems()}</span>
                </div>

                <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition">
                  Send Inquiry
                </button>

                <button
                  onClick={onClose}
                  className="w-full border border-primary text-primary font-semibold py-3 rounded-lg hover:bg-blue-50 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

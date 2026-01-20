'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { CartSidebar } from '@/components/cart-sidebar';
import { CartProvider } from '@/lib/cart-context';
import { AuthForm } from '@/components/auth-form';
import { Mail, CheckCircle2 } from 'lucide-react';

function AuthContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Marketing */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Your neighborhood,{' '}
                  <span className="text-primary">delivered.</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Join thousands of locals discovering unique products from their neighborhood markets every single day.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-8 border-t border-border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-orange-100">
                    <CheckCircle2 className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Verified Sellers</h3>
                  <p className="text-sm text-muted-foreground mt-1">Curated quality</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-100">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Fast Local Delivery</h3>
                  <p className="text-sm text-muted-foreground mt-1">Within 2 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <AuthForm />
          </div>
        </div>
      </main>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default function AuthPage() {
  return (
    <CartProvider>
      <AuthContent />
    </CartProvider>
  );
}

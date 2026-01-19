'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { HowItWorks } from '@/components/how-it-works';
import { Benefits } from '@/components/benefits';
import { ProductsSection } from '@/components/products-section';
import { SellersSection } from '@/components/sellers-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { CartSidebar } from '@/components/cart-sidebar';
import { CartProvider } from '@/lib/cart-context';

function PageContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <ProductsSection />
        <SellersSection />
        <CTASection />
      </main>
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default function Page() {
  return (
    <CartProvider>
      <PageContent />
    </CartProvider>
  );
}

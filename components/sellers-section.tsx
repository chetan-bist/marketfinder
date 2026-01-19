'use client';

import { Button } from '@/components/ui/button';
import { Zap, TrendingUp, BarChart3 } from 'lucide-react';
import Image from 'next/image';

export function SellersSection() {
  const features = [
    {
      icon: Zap,
      title: 'Instant Storefront',
      description: 'Launch your digital presence in minutes with zero tech skills',
    },
    {
      icon: TrendingUp,
      title: 'Smart Inventory',
      description: 'Manage your stock growth with our simplified vendor app',
    },
    {
      icon: BarChart3,
      title: 'Customer Analytics',
      description: 'Understand what your neighborhood wants before they even ask',
    },
  ];

  return (
    <section id="sellers" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Digital Tools for{' '}
              <span className="text-primary">Authentic Sellers</span>
            </h2>

            <div className="space-y-8 mt-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button className="mt-8 bg-primary hover:bg-primary/90 text-white font-semibold">
              Start Selling Today
            </Button>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/Start-Selling-Today.jpg"
                alt="Small business owner using mobile app"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute top-6 right-6 bg-white rounded-lg p-4 shadow-lg">
              <p className="text-2xl font-bold text-primary">+45%</p>
              <p className="text-xs text-muted-foreground">
                Average increase in<br />customer orders after<br />listing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

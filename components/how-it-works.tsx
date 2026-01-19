'use client';

import { MapPin, ShoppingBag, Package } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: MapPin,
      title: 'Select your market',
      description: 'Choose your favorite neighborhood market from our curated list of local hubs.',
    },
    {
      icon: ShoppingBag,
      title: 'Browse local inventory',
      description: 'Check real-time availability of fresh produce, artisanal crafts, and quality items.',
    },
    {
      icon: Package,
      title: 'Order or visit',
      description: 'Get your items delivered right to your door or pick up at the market.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          How it Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-muted rounded-lg p-8 text-center hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 rounded-lg p-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

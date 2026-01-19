'use client';

import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export function Benefits() {
  const benefits = [
    {
      title: 'Real-time availability',
      description: 'Check what\'s in stock at local vendor stalls across your neighborhood.',
    },
    {
      title: 'Price transparency',
      description: 'Compare prices across multiple vendors within the same market.',
    },
    {
      title: 'Community impact',
      description: 'Keep your money in the neighborhood and support families.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/Found-the-freshest-organic.jpg"
                alt="Local market with fresh produce"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-lg max-w-xs">
              <p className="text-xs font-semibold text-primary mb-1">★ LIVE NOW</p>
              <p className="text-sm font-semibold text-foreground">
                "Found the freshest organic crop at just 2 blocks away!"
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Better Shopping for{' '}
              <span className="text-primary">Local Enthusiasts</span>
            </h2>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

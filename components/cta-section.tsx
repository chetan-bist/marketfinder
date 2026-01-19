'use client';

import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-primary rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to find your market gems?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join over 500+ local markets and 10,000+ shoppers building a better local economy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
              Browse Nearby Markets
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold px-8 bg-transparent"
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

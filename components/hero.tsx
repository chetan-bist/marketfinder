'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Hero() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [market, setMarket] = useState('');
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    const query = search || 'products';
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
            Local First Commerce
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Products in Your Local Market{' '}
            <span className="text-primary">Without Leaving Home</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Support local vendors and find exactly what you need in seconds. Real-time inventory from neighborhood stalls.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-border p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select City
              </label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nyc">New York</SelectItem>
                  <SelectItem value="la">Los Angeles</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                  <SelectItem value="sf">San Francisco</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Market
              </label>
              <Select value={market} onValueChange={setMarket}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmers">Farmers Market</SelectItem>
                  <SelectItem value="crafts">Crafts Market</SelectItem>
                  <SelectItem value="organic">Organic Market</SelectItem>
                  <SelectItem value="general">General Market</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Search products or stalls
              </label>
              <Input
                placeholder="What are you looking for?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              onClick={handleSearch}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              Search Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

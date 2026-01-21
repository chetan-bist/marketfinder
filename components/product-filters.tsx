'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export interface FilterState {
  inStockOnly: boolean;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClear: () => void;
}

const SIZES = ['Small (S)', 'Medium (M)', 'Large (L)'];
const COLORS = [
  { name: 'Teal', hex: '#0a7e8c' },
  { name: 'Blue', hex: '#0ea5e9' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Gray', hex: '#9ca3af' },
];

export function ProductFilters({
  filters,
  onFiltersChange,
  onClear,
}: ProductFiltersProps) {
  const [priceMin, setPriceMin] = useState(filters.priceRange[0]);
  const [priceMax, setPriceMax] = useState(filters.priceRange[1]);

  const handlePriceChange = (min: number, max: number) => {
    setPriceMin(min);
    setPriceMax(max);
    onFiltersChange({
      ...filters,
      priceRange: [min, max],
    });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFiltersChange({
      ...filters,
      sizes: newSizes,
    });
  };

  const handleColorToggle = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFiltersChange({
      ...filters,
      colors: newColors,
    });
  };

  const handleStockToggle = () => {
    onFiltersChange({
      ...filters,
      inStockOnly: !filters.inStockOnly,
    });
  };

  return (
    <div className="w-64 bg-white rounded-lg p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-foreground text-lg">Filters</h2>
        <button
          onClick={onClear}
          className="text-primary text-sm font-semibold hover:underline"
        >
          CLEAR ALL
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-primary text-sm mb-4">AVAILABILITY</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={handleStockToggle}
            className={`relative w-12 h-6 rounded-full transition ${
              filters.inStockOnly ? 'bg-primary' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                filters.inStockOnly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-foreground text-sm">In Stock Only</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-primary text-sm mb-4">PRICE RANGE</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="200"
            value={priceMin}
            onChange={(e) => handlePriceChange(Number(e.target.value), priceMax)}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="200"
            value={priceMax}
            onChange={(e) => handlePriceChange(priceMin, Number(e.target.value))}
            className="w-full"
          />
          <div className="flex gap-2 text-sm text-foreground">
            <span>${priceMin}</span>
            <span>-</span>
            <span>${priceMax}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-primary text-sm mb-4">SIZE</h3>
        <div className="space-y-3">
          {SIZES.map((size) => (
            <label key={size} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.sizes.includes(size)}
                onChange={() => handleSizeToggle(size)}
                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
              />
              <span className="text-foreground text-sm">{size}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-primary text-sm mb-4">COLOR SWATCHES</h3>
        <div className="flex gap-3">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorToggle(color.name)}
              className={`w-8 h-8 rounded-full transition border-2 ${
                filters.colors.includes(color.name)
                  ? 'border-foreground'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

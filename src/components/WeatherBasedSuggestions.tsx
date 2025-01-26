import React, { useEffect, useState } from 'react';
import { Cloud, Sun, Droplets } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data/products';

interface WeatherBasedSuggestionsProps {
  onAddToCart: (product: Product) => void;
}

export function WeatherBasedSuggestions({ onAddToCart }: WeatherBasedSuggestionsProps) {
  const [weather, setWeather] = useState<string>('sunny');
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate weather API call
    const weatherTypes = ['sunny', 'rainy', 'cloudy'];
    const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    setWeather(randomWeather);

    // Filter products based on weather
    const weatherProducts = products.filter(product => {
      if (weather === 'rainy') return product.weatherTags?.includes('comfort');
      if (weather === 'sunny') return product.weatherTags?.includes('refreshing');
      return product.weatherTags?.includes('anytime');
    });

    setSuggestions(weatherProducts);
  }, [weather]);

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        {weather === 'sunny' && <Sun className="h-6 w-6 text-yellow-500" />}
        {weather === 'rainy' && <Droplets className="h-6 w-6 text-blue-500" />}
        {weather === 'cloudy' && <Cloud className="h-6 w-6 text-gray-500" />}
        <h3 className="font-semibold">Weather-Based Suggestions</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {suggestions.map(product => (
          <div key={product.id} className="border rounded-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-2" />
            <h4 className="font-medium">{product.name}</h4>
            <p className="text-sm text-gray-600 mb-2">₹{product.price}</p>
            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
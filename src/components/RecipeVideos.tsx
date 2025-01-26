import React from 'react';
import { Play, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface RecipeVideosProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function RecipeVideos({ products, onAddToCart }: RecipeVideosProps) {
  const productsWithRecipes = products.filter(product => product.recipeVideo);

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-6">Quick Recipe Videos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsWithRecipes.map(product => (
          <div key={product.id} className="border rounded-lg overflow-hidden">
            <div className="relative">
              {/* Video thumbnail with play button */}
              <div className="aspect-video relative group cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-opacity">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              
              {/* Duration badge */}
              <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                2:30
              </span>
            </div>

            <div className="p-4">
              <h4 className="font-medium mb-2">{product.name} Recipe</h4>
              <p className="text-sm text-gray-600 mb-4">
                Learn how to make delicious {product.name.toLowerCase()} at home
              </p>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium">Ingredients needed:</span>
                  <span className="text-gray-600"> {product.name}</span>
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-sm">Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
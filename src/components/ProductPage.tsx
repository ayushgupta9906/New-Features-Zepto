import React from 'react';
import { X, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductPageProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductPage({ product, onClose, onAddToCart }: ProductPageProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="relative max-w-2xl mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Product Details</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Product Content */}
        <div className="flex-1">
          <div className="aspect-square w-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="p-4 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">4.5</span>
                </div>
                <span className="text-sm text-gray-500">1,234 ratings</span>
              </div>
            </div>

            <div className="text-2xl font-bold">₹{product.price}</div>

            <div>
              <h3 className="font-medium mb-2">About this item</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="sticky bottom-0 bg-white border-t p-4">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
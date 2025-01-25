import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { CartItem, User } from '../types';
import { CoinAnimation } from './CoinAnimation';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  user: User | null;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, user }: CartProps) {
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 40;
  const coinsToEarn = Math.floor(subtotal / 50); // 1 coin per ₹50 spent

  const handleCheckout = () => {
    if (coinsToEarn > 0) {
      setShowCoinAnimation(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-gray-50">
            {user && coinsToEarn > 0 && (
              <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span>Available Zepto Coins:</span>
                  <span className="font-medium">{user.coins}</span>
                </div>
                <div className="flex justify-between text-sm text-purple-600">
                  <span>Coins you'll earn:</span>
                  <span className="font-medium">+{coinsToEarn}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Earn 1 coin for every ₹50 spent
                </div>
              </div>
            )}
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{subtotal + deliveryFee}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {showCoinAnimation && (
        <CoinAnimation 
          amount={coinsToEarn} 
          onComplete={() => setShowCoinAnimation(false)} 
        />
      )}
    </div>
  );
}
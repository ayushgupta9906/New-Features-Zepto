import React, { useState } from 'react';
import { ListPlus, Calendar, RefreshCw } from 'lucide-react';
import { Product, SmartList } from '../types';
import { products } from '../data/products';

interface SmartShoppingListProps {
  onAddToCart: (product: Product) => void;
}

export function SmartShoppingList({ onAddToCart }: SmartShoppingListProps) {
  const [lists, setLists] = useState<SmartList[]>([
    {
      id: '1',
      name: 'Weekly Essentials',
      items: products.slice(0, 3),
      frequency: 'weekly',
      weatherBased: true
    }
  ]);

  const handleReorder = (list: SmartList) => {
    list.items.forEach(item => onAddToCart(item));
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center">
          <ListPlus className="h-5 w-5 mr-2" />
          Smart Shopping Lists
        </h3>
        <button className="text-purple-600 text-sm">Create New List</button>
      </div>

      <div className="space-y-4">
        {lists.map(list => (
          <div key={list.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{list.name}</h4>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                {list.frequency}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {list.items.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleReorder(list)}
              className="w-full bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reorder List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
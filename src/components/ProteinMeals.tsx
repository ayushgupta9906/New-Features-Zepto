import React from 'react';
import { Dumbbell, ChevronRight } from 'lucide-react';
import { ProteinMeal } from '../types';
import { proteinMeals } from '../data/proteinMeals';

interface ProteinMealsProps {
  onSelect: (meal: ProteinMeal) => void;
}

export function ProteinMeals({ onSelect }: ProteinMealsProps) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Dumbbell className="h-6 w-6 mr-2 text-purple-600" />
          Protein-Rich Meals
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proteinMeals.map(meal => (
          <div
            key={meal.id}
            className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium mb-1">{meal.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
                </div>
                <span className="text-lg font-bold">₹{meal.price}</span>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                {meal.dietaryTags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>{meal.calories} calories</span>
                <span>{meal.protein}g protein</span>
              </div>

              <button
                onClick={() => onSelect(meal)}
                className="w-full bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center"
              >
                Order Now
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
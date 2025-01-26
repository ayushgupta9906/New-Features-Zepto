import { ProteinMeal } from '../types';

export const proteinMeals: ProteinMeal[] = [
  {
    id: 'bowl-1',
    name: 'Grilled Chicken Quinoa Bowl',
    price: 249,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    description: 'Grilled chicken breast with quinoa, roasted vegetables, and tahini dressing',
    protein: 32,
    type: 'bowl',
    ingredients: ['Grilled Chicken', 'Quinoa', 'Broccoli', 'Sweet Potato', 'Tahini'],
    calories: 450,
    dietaryTags: ['High-Protein', 'Gluten-Free']
  },
  {
    id: 'snack-1',
    name: 'Protein Power Snack Box',
    price: 199,
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38',
    description: 'Boiled eggs, protein bar, Greek yogurt, and roasted chickpeas',
    protein: 28,
    type: 'snackBox',
    ingredients: ['Eggs', 'Protein Bar', 'Greek Yogurt', 'Chickpeas'],
    calories: 380,
    dietaryTags: ['High-Protein', 'Gluten-Free']
  },
  {
    id: 'platter-1',
    name: 'Japanese Protein Platter',
    price: 399,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351',
    description: 'Fresh sashimi, edamame, and miso soup',
    protein: 35,
    type: 'platter',
    ingredients: ['Salmon Sashimi', 'Tuna Sashimi', 'Edamame', 'Miso Soup'],
    calories: 420,
    dietaryTags: ['High-Protein', 'Low-Carb']
  }
];
export interface User {
  id: string;
  email: string;
  name: string;
  coins: number;
  walletBalance: number;
  totalOrders: number;
  rank: number;
  preferences?: {
    dietaryRestrictions?: string[];
    proteinPreference?: string;
    moodBasedShopping?: boolean;
  };
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  barcode?: string;
  nutritionalInfo?: {
    protein?: number;
    calories?: number;
    carbs?: number;
    fats?: number;
  };
  weatherTags?: string[];
  moodTags?: string[];
  recipeVideo?: string;
  coinReward: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  coinCost: number;
  type: 'delivery' | 'discount' | 'cashback';
  value: number;
}

export interface Transaction {
  id: number;
  type: 'earned' | 'redeemed' | 'added';
  amount: number;
  date: string;
  order?: string;
  description?: string;
}

export interface ProteinMeal {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  protein: number;
  type: 'bowl' | 'snackBox' | 'platter' | 'mealPack' | 'familyStyle' | 'recovery' | 'vegetarian' | 'kids' | 'seasonal';
  ingredients: string[];
  calories: number;
  dietaryTags: string[];
}

export interface SmartList {
  id: string;
  name: string;
  items: Product[];
  frequency: 'weekly' | 'monthly';
  lastOrdered?: string;
  weatherBased?: boolean;
  moodBased?: boolean;
}

export interface CoinTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earned' | 'spent';
  source: 'purchase' | 'referral' | 'reward' | 'redemption';
  description: string;
  timestamp: Date;
}

export interface CoinReward {
  id: string;
  name: string;
  description: string;
  coinCost: number;
  type: 'discount' | 'cashback' | 'freeDelivery' | 'premium';
  value: number;
  duration?: number;
  minimumOrderValue?: number;
}
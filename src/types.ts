export interface User {
  id: string;
  email: string;
  name: string;
  coins: number;
  walletBalance: number;
  totalOrders: number;
  rank: number;
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
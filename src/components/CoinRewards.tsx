import React from 'react';
import { Coins, Gift, TrendingUp, Truck } from 'lucide-react';
import { CoinReward, User } from '../types';

interface CoinRewardsProps {
  user: User;
  onRedeemReward: (reward: CoinReward) => void;
}

const COIN_REWARDS: CoinReward[] = [
  {
    id: 'reward-1',
    name: 'Free Delivery Pass',
    description: 'Free delivery on all orders for 7 days',
    coinCost: 100,
    type: 'freeDelivery',
    value: 40,
    duration: 7
  },
  {
    id: 'reward-2',
    name: '₹200 Cashback',
    description: 'Instant cashback to your wallet',
    coinCost: 150,
    type: 'cashback',
    value: 200
  },
  {
    id: 'reward-3',
    name: '15% Discount',
    description: 'On orders above ₹500',
    coinCost: 80,
    type: 'discount',
    value: 15,
    minimumOrderValue: 500
  },
  {
    id: 'reward-4',
    name: 'Premium Member',
    description: 'Priority delivery & exclusive deals for 30 days',
    coinCost: 300,
    type: 'premium',
    value: 0,
    duration: 30
  }
];

export function CoinRewards({ user, onRedeemReward }: CoinRewardsProps) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Coins className="h-6 w-6 text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold">Zepto Coin Rewards</h3>
        </div>
        <div className="flex items-center bg-purple-100 px-3 py-1 rounded-full">
          <Coins className="h-4 w-4 text-purple-600 mr-1" />
          <span className="text-purple-600 font-medium">{user.coins} coins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COIN_REWARDS.map(reward => (
          <div
            key={reward.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center">
                  {reward.type === 'freeDelivery' && <Truck className="h-5 w-5 text-purple-600 mr-2" />}
                  {reward.type === 'cashback' && <TrendingUp className="h-5 w-5 text-green-600 mr-2" />}
                  {reward.type === 'premium' && <Gift className="h-5 w-5 text-gold-600 mr-2" />}
                  <h4 className="font-medium">{reward.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
              </div>
              <span className="flex items-center text-sm font-medium">
                <Coins className="h-4 w-4 text-yellow-500 mr-1" />
                {reward.coinCost}
              </span>
            </div>

            <button
              onClick={() => onRedeemReward(reward)}
              disabled={user.coins < reward.coinCost}
              className={`w-full py-2 rounded-lg text-sm font-medium ${
                user.coins >= reward.coinCost
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Redeem Reward
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-purple-50 rounded-lg p-4">
        <h4 className="font-medium mb-2">How to Earn More Coins</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Earn 1 coin for every ₹50 spent</li>
          <li>• Get 50 coins for referring a friend</li>
          <li>• Bonus coins on featured products</li>
          <li>• Complete challenges for extra coins</li>
        </ul>
      </div>
    </div>
  );
}
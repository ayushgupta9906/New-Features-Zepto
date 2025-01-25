import React from 'react';
import { Trophy, Gift } from 'lucide-react';
import { User } from '../types';

interface LeaderboardProps {
  users: User[];
  currentUser: User | null;
}

export function Leaderboard({ users, currentUser }: LeaderboardProps) {
  const topUsers = users.slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
          Top Shoppers
        </h2>
        <div className="flex items-center space-x-2 text-purple-600">
          <Gift className="h-5 w-5" />
          <span className="text-sm font-medium">Weekly Rewards</span>
        </div>
      </div>

      <div className="space-y-4">
        {topUsers.map((user, index) => (
          <div
            key={user.id}
            className={`flex items-center p-3 rounded-lg ${
              currentUser?.id === user.id ? 'bg-purple-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="w-8 h-8 flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div className="flex-1 ml-4">
              <div className="flex items-center">
                <span className="font-medium">{user.name}</span>
                {index < 3 && (
                  <span className="ml-2 text-yellow-500">
                    {'★'.repeat(3 - index)}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600">
                {user.totalOrders} orders • {user.coins} coins
              </div>
            </div>
            {index < 3 && (
              <div className="text-sm font-medium text-purple-600">
                {index === 0 && 'Free delivery for 1 month'}
                {index === 1 && '₹500 cashback'}
                {index === 2 && '₹250 cashback'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
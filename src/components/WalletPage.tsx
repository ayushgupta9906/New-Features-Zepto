import React, { useState } from 'react';
import { X, Coins, CreditCard, History, Gift, ArrowUpRight, Plus } from 'lucide-react';
import { User, Reward, Transaction } from '../types';

interface WalletPageProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onAddMoney: (amount: number) => void;
  onRedeemReward: (reward: Reward) => void;
}

const REWARDS: Reward[] = [
  {
    id: '1',
    name: 'Free Delivery',
    description: 'Free delivery on your next order',
    coinCost: 10,
    type: 'delivery',
    value: 40
  },
  {
    id: '2',
    name: '₹100 Off',
    description: 'Get ₹100 off on orders above ₹500',
    coinCost: 50,
    type: 'discount',
    value: 100
  },
  {
    id: '3',
    name: '₹50 Cashback',
    description: 'Instant cashback to your wallet',
    coinCost: 25,
    type: 'cashback',
    value: 50
  }
];

export function WalletPage({ isOpen, onClose, user, onAddMoney, onRedeemReward }: WalletPageProps) {
  const [addMoneyAmount, setAddMoneyAmount] = useState<number>(0);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: 'earned', amount: 2, date: '2024-03-15', order: '#12345' },
    { id: 2, type: 'redeemed', amount: 10, date: '2024-03-14', description: 'Free Delivery' },
    { id: 3, type: 'earned', amount: 3, date: '2024-03-13', order: '#12344' }
  ]);

  const handleAddMoney = () => {
    if (addMoneyAmount > 0) {
      onAddMoney(addMoneyAmount);
      setTransactions(prev => [{
        id: Date.now(),
        type: 'added',
        amount: addMoneyAmount,
        date: new Date().toISOString().split('T')[0],
        description: 'Added to wallet'
      }, ...prev]);
      setAddMoneyAmount(0);
      setShowAddMoney(false);
    }
  };

  const handleRedeemReward = (reward: Reward) => {
    if (user.coins >= reward.coinCost) {
      onRedeemReward(reward);
      setTransactions(prev => [{
        id: Date.now(),
        type: 'redeemed',
        amount: reward.coinCost,
        date: new Date().toISOString().split('T')[0],
        description: reward.name
      }, ...prev]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Zepto Wallet</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Balance Cards */}
            <div className="p-4 space-y-4">
              <div className="bg-purple-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Coins className="h-6 w-6 mr-2" />
                    <span className="font-medium">Zepto Coins</span>
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{user.coins}</div>
                <div className="text-sm text-white/80">
                  Earn 1 coin for every ₹50 spent
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <CreditCard className="h-6 w-6 mr-2" />
                    <span className="font-medium">Wallet Balance</span>
                  </div>
                  <button 
                    onClick={() => setShowAddMoney(true)}
                    className="text-sm bg-purple-600 text-white px-3 py-1 rounded-full flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Money
                  </button>
                </div>
                <div className="text-3xl font-bold mb-2">₹{user.walletBalance}</div>
                <div className="text-sm text-gray-600">
                  Available for your next purchase
                </div>
              </div>

              {/* Add Money Form */}
              {showAddMoney && (
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="number"
                      value={addMoneyAmount}
                      onChange={(e) => setAddMoneyAmount(Math.max(0, parseInt(e.target.value) || 0))}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="Enter amount"
                      min="0"
                    />
                    <button
                      onClick={handleAddMoney}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    {[100, 200, 500, 1000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setAddMoneyAmount(amount)}
                        className="px-3 py-1 border rounded-full text-sm hover:bg-gray-50"
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Rewards */}
            <div className="p-4">
              <h3 className="font-semibold mb-3">Available Rewards</h3>
              <div className="grid grid-cols-2 gap-4">
                {REWARDS.map((reward) => (
                  <button
                    key={reward.id}
                    onClick={() => handleRedeemReward(reward)}
                    disabled={user.coins < reward.coinCost}
                    className={`border rounded-lg p-4 text-left transition-colors ${
                      user.coins >= reward.coinCost
                        ? 'hover:border-purple-600 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <Gift className="h-5 w-5 text-purple-600 mb-2" />
                    <div className="font-medium mb-1">{reward.name}</div>
                    <div className="text-sm text-gray-600">{reward.coinCost} coins</div>
                    <div className="text-xs text-gray-500 mt-1">{reward.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction History */}
            <div className="p-4">
              <h3 className="font-semibold mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="flex items-center">
                        {tx.type === 'earned' && (
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        {tx.type === 'redeemed' && (
                          <History className="h-4 w-4 text-purple-600 mr-2" />
                        )}
                        {tx.type === 'added' && (
                          <Plus className="h-4 w-4 text-blue-500 mr-2" />
                        )}
                        <span className="font-medium">
                          {tx.type === 'earned' && `Earned ${tx.amount} coins`}
                          {tx.type === 'redeemed' && `Redeemed ${tx.amount} coins`}
                          {tx.type === 'added' && `Added ₹${tx.amount}`}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {tx.order ? `Order ${tx.order}` : tx.description}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{tx.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
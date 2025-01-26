
import React from 'react';
import { Search, ShoppingCart, ChevronDown, MapPin, User as UserIcon, LogOut, Wallet } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onOpenCart: () => void;
  onOpenWallet: () => void;
  cartItemsCount: number;
}

export function Header({ user, onLogin, onLogout, onOpenCart, onOpenWallet, cartItemsCount }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <a aria-label="Zepto Home" data-testid="zepto-logo" href="/">
              <img
                alt="Zepto Logo"
                loading="lazy"
                width="90"
                height="30"
                decoding="async"
                className="relative overflow-hidden inline-block min-w-[90px]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                srcSet="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.35.0/images/header/primary-logo.svg 256w, https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.35.0/images/header/primary-logo.svg 384w, https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.35.0/images/header/primary-logo.svg 640w, https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.35.0/images/header/primary-logo.svg 750w, https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.35.0/images/header/primary-logo.svg 828w, https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.35.0/images/header/primary-logo.svg 1080w, https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.35.0/images/header/primary-logo.svg 1200w, https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.35.0/images/header/primary-logo.svg 1920w, https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.35.0/images/header/primary-logo.svg 2048w, https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.35.0/images/header/primary-logo.svg 3840w"
                src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.35.0/images/header/primary-logo.svg"
                style={{ color: 'transparent', objectFit: 'contain' }}
              />
            </a>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">Deliver to:</span>
              <button className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center">
                Select Location
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for over 5000 products"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onOpenWallet}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  <Wallet className="h-5 w-5 text-purple-600" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{user.coins} coins</span>
                    <span className="text-xs text-gray-600">₹{user.walletBalance}</span>
                  </div>
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{user.name}</span>
                  <UserIcon className="h-5 w-5 text-gray-600" />
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <LogOut className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Login
              </button>
            )}
            <button
              onClick={onOpenCart}
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
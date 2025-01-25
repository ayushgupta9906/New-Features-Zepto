import React, { useState } from 'react';
import { Header } from './components/Header';
import { Cart } from './components/Cart';
import { Login } from './components/Login';
import { Leaderboard } from './components/Leaderboard';
import { Scanner } from './components/Scanner';
import { WalletPage } from './components/WalletPage';
import { ProductPage } from './components/ProductPage';
import { Search, ShoppingCart, ChevronDown, Clock3, MapPin } from 'lucide-react';
import { User, CartItem, Product } from './types';
import { products } from './data/products';

// Mock data
const mockUser: User = {
  id: '2',
  email: 'user@example.com',
  name: 'Ayush Gupta',
  coins: 500,
  walletBalance: 1000,
  totalOrders: 25,
  rank: 3
};

const mockUsers: User[] = [
  mockUser,
  {
    id: '1',
    email: 'jane@example.com',
    name: 'Arush Arora',
    coins: 750,
    walletBalance: 1500,
    totalOrders: 35,
    rank: 1
  },
];

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);

  const handleLogin = (email: string, password: string) => {
    setUser(mockUser);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleScan = (barcode: string) => {
    const product = products.find(p => p.barcode === barcode);
    if (product) {
      setScannedProduct(product);
    }
  };

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }]);
    }
    
    setScannedProduct(null);
  };

  const handleAddMoney = (amount: number) => {
    if (user) {
      setUser({
        ...user,
        walletBalance: user.walletBalance + amount
      });
    }
  };

  const handleRedeemReward = (reward: Reward) => {
    if (user && user.coins >= reward.coinCost) {
      let newWalletBalance = user.walletBalance;
      
      if (reward.type === 'cashback') {
        newWalletBalance += reward.value;
      }

      setUser({
        ...user,
        coins: user.coins - reward.coinCost,
        walletBalance: newWalletBalance
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        user={user}
        onLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWallet={() => setIsWalletOpen(true)}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Hero Section */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80"
          alt="Fresh groceries"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <h2 className="text-4xl font-bold text-white mb-4">
                Groceries delivered in minutes
              </h2>
              <p className="text-xl text-white mb-8">
                Order fresh groceries, fruits, vegetables & more
              </p>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold mb-8">Shop by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="group cursor-pointer">
              <div className="aspect-square rounded-lg overflow-hidden mb-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <p className="text-sm font-medium text-center">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Section */}
      {user && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Leaderboard users={mockUsers} currentUser={user} />
        </div>
      )}

      {/* Features */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <Clock3 className="h-8 w-8 text-purple-600" />
              <div>
                <h4 className="font-semibold">10 Minute Delivery</h4>
                <p className="text-sm text-gray-600">Get your order in minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-8 w-8 text-purple-600" />
              <div>
                <h4 className="font-semibold">Wide Coverage</h4>
                <p className="text-sm text-gray-600">Available in major cities</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ShoppingCart className="h-8 w-8 text-purple-600" />
              <div>
                <h4 className="font-semibold">5000+ Products</h4>
                <p className="text-sm text-gray-600">Fresh and high quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={(id) => handleUpdateQuantity(id, 0)}
        user={user}
      />

      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />

      {user && (
        <WalletPage
          isOpen={isWalletOpen}
          onClose={() => setIsWalletOpen(false)}
          user={user}
          onAddMoney={handleAddMoney}
          onRedeemReward={handleRedeemReward}
        />
      )}

      {/* Scanner */}
      <Scanner 
        onScan={handleScan}
        onProductFound={setScannedProduct}
      />

      {/* Product Page */}
      {scannedProduct && (
        <ProductPage
          product={scannedProduct}
          onClose={() => setScannedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

const categories = [
  {
    name: "Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80"
  },
  {
    name: "Dairy & Breakfast",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80"
  },
  {
    name: "Snacks",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80"
  },
  {
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80"
  },
  {
    name: "Personal Care",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80"
  },
  {
    name: "Household",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80"
  }
];

export default App;
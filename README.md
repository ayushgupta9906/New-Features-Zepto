# Zepto Clone

A modern e-commerce application built with React, TypeScript, and Tailwind CSS, featuring real-time scanning, coin rewards, and an intuitive shopping experience.

![Zepto Clone Screenshot](https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80)

## Features

### 🛒 Shopping Experience
- Browse products by categories
- Real-time product search
- AR/VR-based barcode scanning
- Detailed product pages
- Shopping cart management

### 💰 Rewards System
- Earn coins on purchases (1 coin per ₹50 spent)
- Coin animation effects
- Redeem coins for rewards:
  - Free delivery
  - Cashback
  - Discounts

### 👤 User Features
- User authentication
- Digital wallet
- Order history
- Leaderboard system

### 📱 UI/UX
- Modern, responsive design
- Smooth animations
- Real-time updates
- Mobile-first approach

## Demo Products

The application includes demo products for testing:

1. **Maggi 2-Minute Noodles**
   - Price: ₹14
   - Category: Instant Food

2. **American Sweet Corn**
   - Price: ₹40
   - Category: Fresh Vegetables

3. **Lay's Classic Salted Chips**
   - Price: ₹20
   - Category: Snacks

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Build Tool**: Vite

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Testing Features

### Scanner Demo
1. Click the camera icon in the bottom right
2. The scanner will simulate finding a random product
3. Product details will be displayed
4. Add the product to your cart

### Rewards System
1. Add items to cart
2. Notice coin earning calculations (1 coin per ₹50)
3. Click "Proceed to Checkout" to see coin animation
4. Visit wallet to redeem coins for rewards

### Wallet Features
1. Login to access wallet
2. Add money to wallet
3. View transaction history
4. Redeem available rewards

## Project Structure

```
src/
├── components/         # React components
├── data/              # Mock data and constants
├── types/             # TypeScript interfaces
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
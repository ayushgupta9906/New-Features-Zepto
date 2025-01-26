import React, { useState, useEffect, useRef } from 'react';
import { Camera, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';

interface ScannerProps {
  onScan: (barcode: string) => void;
  onProductFound: (product: Product) => void;
}

export function Scanner({ onScan, onProductFound }: ScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannerPosition, setScannerPosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScannerPosition(prev => ({
          x: prev.x,
          y: prev.y > 100 ? 0 : prev.y + 2
        }));
      }, 16);

      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startScanning = async () => {
    setIsScanning(true);
    await startCamera();

    // Simulate scanning a random product after 2 seconds
    setTimeout(() => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      onScan(randomProduct.barcode!);
      onProductFound(randomProduct);
      setIsScanning(false);
      stopCamera();
    }, 2000);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {isScanning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative w-80 h-80 bg-transparent border-2 border-white rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* AR-like scanning effect */}
            <div 
              className="absolute left-0 right-0 h-1 bg-purple-500 opacity-75"
              style={{
                top: `${scannerPosition.y}%`,
                boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)',
                transition: 'top 0.016s linear'
              }}
            />
            
            {/* Corner markers for AR effect */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500" />
            
            {/* Scanning instructions */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <p className="text-sm">Position barcode within frame</p>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={startScanning}
        className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors relative overflow-hidden"
      >
        {isScanning ? (
          <RotateCcw className="h-6 w-6 animate-spin" />
        ) : (
          <Camera className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
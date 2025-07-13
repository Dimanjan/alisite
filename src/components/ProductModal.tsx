import { X, Star, MessageCircle, Calendar, HardDrive, Monitor, Check } from 'lucide-react';
import type { Product } from '../types';
import { useState, useEffect } from 'react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  if (!isOpen || !product) return null;

  // Countdown timer logic
  const getCountdown = (endTime?: string) => {
    if (!endTime) return null;
    const end = new Date(endTime).getTime();
    const now = Date.now();
    if (end <= now) return 'Offer ended';
    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    if (days > 0) return `Offer ends in ${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Offer ends in ${hours} hr${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `Offer ends in ${minutes} min${minutes > 1 ? 's' : ''}`;
    return 'Offer ends soon';
  };
  const [countdown, setCountdown] = useState(() => getCountdown(product.dealEndTime));
  useEffect(() => {
    if (!product.dealEndTime) return;
    const interval = setInterval(() => {
      setCountdown(getCountdown(product.dealEndTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [product.dealEndTime]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 animate-slide-up">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-5 right-5 z-20 p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-gray-600 group-hover:text-blue-700 transition-colors" />
          </button>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left: Image and Basic Info */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 lg:h-80 object-cover rounded-xl"
              />
              
              {/* Tags */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 flex-1 mr-4">
                    {product.name}
                  </h1>
                  <div className="flex flex-col items-end">
                    {/* Discount Badge */}
                    {product.discountBadge && (
                      <span className="mb-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {product.discountBadge}
                      </span>
                    )}
                    <div className="flex items-center space-x-2">
                      {/* Original Price */}
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-base font-normal">₹{product.originalPrice}</span>
                      )}
                      <span className="text-3xl font-bold text-blue-600">₹{product.price}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mb-4">
                  <span className="px-2 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
              </div>

              {/* Countdown Timer */}
              {product.dealEndTime && (
                <div className="text-xs text-red-600 font-semibold mb-2 animate-pulse">
                  {countdown}
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">File Size</p>
                      <p className="font-medium">{product.fileSize}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">{new Date(product.lastUpdated).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compatibility */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Compatibility
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.compatibility.map((platform) => (
                    <span
                      key={platform}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center">
                <a
                  href={`https://wa.me/918591587165?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 no-underline !no-underline"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Contact Sales on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
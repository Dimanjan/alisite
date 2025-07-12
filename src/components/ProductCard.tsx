import { Star, MessageCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Link to={`/product/${product.id}`} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        
        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => onViewDetails(product)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Title and Price */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
            {product.name}
          </h3>
          <div className="text-right flex items-center">
            <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm font-medium text-gray-900">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={tag + '-' + idx}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              +{product.tags.length - 3} more
            </span>
          )}
        </div>

        {/* File Size and Compatibility */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>Size: {product.fileSize}</span>
          <span>{product.compatibility.slice(0, 2).join(', ')}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-none !border-0 focus:!border-0 active:!border-0"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </button>
          <a
            href={`https://wa.me/918591587165?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 no-underline !no-underline"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Contact Sales</span>
          </a>
        </div>
      </div>
    </Link>
  );
}; 
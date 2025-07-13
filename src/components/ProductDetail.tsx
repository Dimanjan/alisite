import { useParams } from 'react-router-dom';
import productsData from '../data/products.json';
import type { Product } from '../types';
import { useState, useEffect } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = (productsData.products as Product[]).find((p) => p.id === id);

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
  const [countdown, setCountdown] = useState(() => getCountdown(product?.dealEndTime));
  useEffect(() => {
    if (!product?.dealEndTime) return;
    const interval = setInterval(() => {
      setCountdown(getCountdown(product.dealEndTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [product?.dealEndTime]);

  if (!product) {
    return <div className="max-w-2xl mx-auto py-16 text-center text-2xl text-gray-500">Product not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full max-w-md mx-auto rounded-xl mb-6" />
      <div className="mb-4 text-lg text-gray-700">{product.description}</div>
      <div className="mb-2 font-semibold flex items-center gap-2">
        Price:
        {/* Discount Badge */}
        {product.discountBadge && (
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            {product.discountBadge}
          </span>
        )}
        {/* Original Price */}
        {product.originalPrice && (
          <span className="text-gray-400 line-through text-base font-normal ml-2">₹{product.originalPrice}</span>
        )}
        <span className="text-blue-600 text-xl font-bold ml-2">₹{product.price}</span>
      </div>
      {/* Countdown Timer */}
      {product.dealEndTime && (
        <div className="text-xs text-red-600 font-semibold mb-2 animate-pulse">
          {countdown}
        </div>
      )}
      <div className="mb-2">Category: <span className="text-gray-800">{product.category}</span></div>
      <div className="mb-2">Tags: {product.tags.map((tag, i) => <span key={tag + '-' + i} className="inline-block bg-gray-100 text-gray-600 text-xs rounded-md px-2 py-1 mr-1">{tag}</span>)}</div>
      <div className="mb-2">Rating: <span className="text-yellow-500 font-bold">{product.rating}</span> ({product.reviews} reviews)</div>
      <div className="mb-2">Compatibility: {product.compatibility.join(', ')}</div>
      <div className="mb-2">File Size: {product.fileSize}</div>
      <div className="mb-2">Last Updated: {product.lastUpdated}</div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside text-gray-700">
          {product.features.map((feature, i) => (
            <li key={feature + '-' + i}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <a
          href={`https://wa.me/918591587165?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 no-underline !no-underline"
        >
          Contact Sales on WhatsApp
        </a>
      </div>
    </div>
  );
} 
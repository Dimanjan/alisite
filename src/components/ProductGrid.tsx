import { ProductCard } from './ProductCard';
import { LoadingCard } from './LoadingCard';
import type { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onViewDetails: (product: Product) => void;
}

export const ProductGrid = ({ products, isLoading, onViewDetails }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.438-1.01-5.9-2.618C4.636 10.91 4 8.79 4 6.5S4.636 2.09 6.1.618A7.962 7.962 0 0112 1c2.34 0 4.438 1.01 5.9 2.618C19.364 5.09 20 7.21 20 9.5s-.636 4.41-2.1 5.882z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}; 
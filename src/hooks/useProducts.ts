import { useState, useEffect, useMemo } from 'react';
import type { Product, ProductData, FilterState } from '../types';
import productsData from '../data/products.json';

const initialFilters: FilterState = {
  searchQuery: '',
  selectedCategory: '',
  // Increase max price to allow displaying higher-priced products (in INR)
  priceRange: { min: 0, max: 10000 },
  sortBy: 'name-asc',
  selectedTags: [],
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      const data = productsData as ProductData;
      setProducts(data.products);
      setCategories(data.categories);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.selectedCategory && filters.selectedCategory !== 'All') {
        if (product.category !== filters.selectedCategory) return false;
      }

      // Price range filter
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }

      // Tags filter
      if (filters.selectedTags.length > 0) {
        const hasMatchingTag = filters.selectedTags.some(tag => 
          product.tags.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'reviews-desc':
          return b.reviews - a.reviews;
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, filters]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    products.forEach(product => {
      product.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [products]);

  return {
    products: filteredProducts,
    allProducts: products,
    categories,
    filters,
    isLoading,
    updateFilters,
    resetFilters,
    allTags,
    totalProducts: filteredProducts.length,
  };
}; 
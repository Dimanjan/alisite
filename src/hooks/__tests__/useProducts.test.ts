import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useProducts } from '../useProducts';

// Mock the products data
vi.mock('../../data/products.json', () => ({
  default: {
    products: [
      {
        id: '1',
        name: 'Test Product 1',
        description: 'Test description 1',
        price: 50,
        category: 'Productivity',
        tags: ['test', 'productivity'],
        image: 'test1.jpg',
        rating: 4.5,
        reviews: 100,
        downloadUrl: '#',
        features: ['Feature 1'],
        fileSize: '10 MB',
        compatibility: ['Windows'],
        lastUpdated: '2024-01-15',
      },
      {
        id: '2',
        name: 'Test Product 2',
        description: 'Test description 2',
        price: 100,
        category: 'Design',
        tags: ['test', 'design'],
        image: 'test2.jpg',
        rating: 4.0,
        reviews: 50,
        downloadUrl: '#',
        features: ['Feature 2'],
        fileSize: '20 MB',
        compatibility: ['macOS'],
        lastUpdated: '2024-01-20',
      },
    ],
    categories: ['Productivity', 'Design'],
  },
}));

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should load products and categories', async () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.isLoading).toBe(true);

    // Fast-forward past the loading timeout
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.allProducts).toHaveLength(2);
    expect(result.current.categories).toEqual(['Productivity', 'Design']);
  });

  it('should filter products by search query', async () => {
    const { result } = renderHook(() => useProducts());

    // Wait for loading to complete
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.updateFilters({ searchQuery: 'Product 1' });
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].name).toBe('Test Product 1');
  });

  it('should filter products by category', async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.updateFilters({ selectedCategory: 'Design' });
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].category).toBe('Design');
  });

  it('should filter products by price range', async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.updateFilters({ priceRange: { min: 0, max: 75 } });
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].price).toBe(50);
  });

  it('should sort products correctly', async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.updateFilters({ sortBy: 'price-desc' });
    });

    expect(result.current.products[0].price).toBe(100);
    expect(result.current.products[1].price).toBe(50);
  });

  it('should reset filters', async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.updateFilters({ searchQuery: 'test', selectedCategory: 'Design' });
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filters.searchQuery).toBe('');
    expect(result.current.filters.selectedCategory).toBe('');
  });

  it('should generate all tags correctly', async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.allTags).toEqual(['design', 'productivity', 'test']);
  });
}); 
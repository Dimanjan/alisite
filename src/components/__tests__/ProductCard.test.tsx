import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProductCard } from '../ProductCard';
import type { Product } from '../../types';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'This is a test product description',
  price: 49.99,
  category: 'Test Category',
  tags: ['test', 'product', 'demo'],
  image: 'https://example.com/image.jpg',
  rating: 4.5,
  reviews: 100,
  downloadUrl: 'https://example.com/download',
  features: ['Feature 1', 'Feature 2'],
  fileSize: '10 MB',
  compatibility: ['Windows', 'macOS'],
  lastUpdated: '2024-01-15',
};

const mockOnViewDetails = vi.fn();

describe('ProductCard', () => {
  beforeEach(() => {
    mockOnViewDetails.mockClear();
  });

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
    expect(screen.getByText('₹49.99')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(100 reviews)')).toBeInTheDocument();
    expect(screen.getByText('Size: 10 MB')).toBeInTheDocument();
  });

  it('displays product tags', () => {
    render(<ProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('product')).toBeInTheDocument();
    expect(screen.getByText('demo')).toBeInTheDocument();
  });

  it('calls onViewDetails when View Details button is clicked', () => {
    render(<ProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);

    const viewDetailsButton = screen.getByRole('button', { name: /view details/i });
    fireEvent.click(viewDetailsButton);

    expect(mockOnViewDetails).toHaveBeenCalledWith(mockProduct);
  });

  it('has correct download link', () => {
    render(<ProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);

    const downloadLink = screen.getByRole('link', { name: /download/i });
    expect(downloadLink).toHaveAttribute('href', 'https://example.com/download');
  });

  it('displays compatibility information', () => {
    render(<ProductCard product={mockProduct} onViewDetails={mockOnViewDetails} />);

    expect(screen.getByText('Windows, macOS')).toBeInTheDocument();
  });

  it('truncates tags when there are more than 3', () => {
    const productWithManyTags = {
      ...mockProduct,
      tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
    };

    render(<ProductCard product={productWithManyTags} onViewDetails={mockOnViewDetails} />);

    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(screen.getByText('tag3')).toBeInTheDocument();
    expect(screen.getByText('+2 more')).toBeInTheDocument();
  });
}); 
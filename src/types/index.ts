export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  dealEndTime?: string;
  category: string;
  tags: string[];
  image: string;
  rating: number;
  reviews: number;
  downloadUrl: string;
  features: string[];
  fileSize: string;
  compatibility: string[];
  lastUpdated: string;
}

export interface ProductData {
  products: Product[];
  categories: string[];
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: SortOption;
  selectedTags: string[];
}

export type SortOption = 
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'reviews-desc'
  | 'newest';

export interface SearchFilters {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  tags: string[];
}

export interface ViewState {
  selectedProduct: Product | null;
  isModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
  viewMode: 'grid' | 'list';
}

export interface AppState {
  products: Product[];
  categories: string[];
  filters: FilterState;
  view: ViewState;
} 
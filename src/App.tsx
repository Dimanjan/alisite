import { useState } from 'react';
import { Header } from './components/Header';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { useProducts } from './hooks/useProducts';
import type { Product } from './types';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    products,
    categories,
    filters,
    isLoading,
    updateFilters,
    resetFilters,
    allTags,
    totalProducts,
  } = useProducts();

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSearchChange = (query: string) => {
    updateFilters({ searchQuery: query });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        onSearchChange={handleSearchChange}
        searchQuery={filters.searchQuery}
        productsCount={totalProducts}
      />

      <div className="flex">
        {/* Sidebar */}
        <FilterSidebar
          filters={filters}
          categories={categories}
          tags={allTags}
          onFilterChange={updateFilters}
          onResetFilters={resetFilters}
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-8 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            {!filters.searchQuery && filters.selectedCategory === '' && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                  <h1 className="text-4xl font-bold mb-4">
                    Discover Amazing Digital Tools
                  </h1>
                  <p className="text-xl opacity-90 mb-6">
                    Find the perfect digital products to boost your productivity, creativity, and success.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{totalProducts}+</div>
                      <div className="text-blue-100">Digital Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{categories.length}</div>
                      <div className="text-blue-100">Categories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">4.7</div>
                      <div className="text-blue-100">Average Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filters.searchQuery ? `Search Results for "${filters.searchQuery}"` : 
                   filters.selectedCategory ? `${filters.selectedCategory} Products` : 
                   'All Products'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {isLoading ? 'Loading...' : `${totalProducts} products found`}
                </p>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={products}
              isLoading={isLoading}
              onViewDetails={handleViewDetails}
            />
          </div>
        </main>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;

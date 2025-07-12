import { Search } from 'lucide-react';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  productsCount: number;
}

export const Header = ({ onSearchChange, searchQuery, productsCount }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-transparent rounded-lg mr-4">
              <img src="/MAF Account Creator-02.svg" alt="Site Logo" className="h-20 w-20" />
            </div>
            <div className="flex flex-col gap-0">
              <h1 className="text-xl font-bold text-gray-900 leading-none m-0 p-0">MAF ACCOUNT CRAFTER</h1>
              <p className="text-xs text-gray-500 m-0 p-0">Digital Tools Seller</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search digital products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Products Count & Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <span className="font-medium">{productsCount}</span>
              <span>products found</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 

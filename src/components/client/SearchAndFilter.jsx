import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { setSearchQuery, filterProducts } from '../../store/slices/productsSlice';
import { Search, Filter, X } from 'lucide-react';

const SearchAndFilter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.products.searchQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
    dispatch(filterProducts());
  };

  const clearFilters = () => {
    dispatch(setSearchQuery(''));
    setPriceRange([0, 1000]);
    dispatch(filterProducts());
  };

  return (
    <section className="py-8 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200"
            >
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">فلترة</span>
            </button>

            {(searchQuery || priceRange[0] > 0 || priceRange[1] < 1000) && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
              >
                <X className="h-4 w-4" />
                <span>مسح</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('filter.priceRange')}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0]} د.م</span>
                    <span>{priceRange[1]} د.م</span>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الألوان
                </label>
                <div className="flex flex-wrap gap-2">
                  {['أسود', 'أبيض', 'أزرق', 'أحمر', 'أخضر', 'أصفر'].map((color) => (
                    <button
                      key={color}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المقاسات
                </label>
                <div className="flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL', '36', '37', '38', '39', '40'].map((size) => (
                    <button
                      key={size}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchAndFilter;
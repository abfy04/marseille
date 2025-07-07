import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedCategory, filterProducts } from '../../store/slices/productsSlice';
import SearchAndFilter from '../../components/client/SearchAndFilter';
import ProductsGrid from '../../components/client/ProductsGrid';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const category = useSelector((state) => 
    state.categories.categories.find(cat => cat.id === categoryId)
  );

  useEffect(() => {
    if (categoryId) {
      dispatch(setSelectedCategory(categoryId));
      dispatch(filterProducts());
    }
  }, [categoryId, dispatch]);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            {category.categorie_name}
          </h1>
        </div>
      </div>
      <SearchAndFilter />
      <ProductsGrid />
    </div>
  );
};

export default CategoryPage;
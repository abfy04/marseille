import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterProducts } from '../../store/slices/productsSlice';
import HeroSection from '../../components/client/HeroSection';
import CategoriesSlider from '../../components/client/CategoriesSlider';
import SearchAndFilter from '../../components/client/SearchAndFilter';
import ProductsGrid from '../../components/client/ProductsGrid';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterProducts());
  }, [dispatch]);

  return (
    <div>
      <HeroSection />
      <CategoriesSlider />
      <SearchAndFilter />
      <ProductsGrid />
    </div>
  );
};

export default HomePage;
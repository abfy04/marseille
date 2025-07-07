
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { setSelectedCategory, filterProducts } from '../../store/slices/productsSlice';


const CategoriesSlider = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const selectedCategory = useSelector((state) => state.products.selectedCategory);

  const handleCategoryClick = (categoryId) => {
    dispatch(setSelectedCategory(categoryId === selectedCategory ? null : categoryId));
    dispatch(filterProducts());
  };

  const isRTL = i18n.language === 'ar';

  return (
    <section className="py-16 bg-white" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('categories.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اختر من بين مجموعة متنوعة من التصنيفات المميزة
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                selectedCategory === category.id 
                  ? 'ring-4 ring-blue-500 ring-opacity-50' 
                  : ''
              }`}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={category.categorie_img}
                  alt={category.categorie_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 text-center">
                  {category.categorie_name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSlider;
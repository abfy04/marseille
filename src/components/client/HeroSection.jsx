import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Star, ArrowRight, ArrowLeft } from 'lucide-react';

const HeroSection= () => {
  const { t, i18n } = useTranslation();
  const offeredProducts = useSelector((state) => 
    state.products.products.filter(product => product.is_offered)
  );

  const isRTL = i18n.language === 'ar';

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {t('hero.subtitle')}
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
            {t('hero.cta')}
          </button>
        </div>

        {/* Offered Products */}
        {offeredProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              <Star className="inline-block h-6 w-6 ml-2 text-yellow-400" />
              العروض الخاصة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offeredProducts.slice(0, 3).map((product) => (
                <div key={product.id} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 hover:bg-opacity-20 transition-all duration-300">
                  <div className="aspect-square bg-white bg-opacity-20 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={product.product_img} 
                      alt={product.product_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{product.product_name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-yellow-400 text-xl font-bold">
                        {product.offered_price} د.م
                      </span>
                      <span className="text-gray-300 line-through text-sm">
                        {product.price} د.م
                      </span>
                    </div>
                    <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full transition-all duration-200">
                      {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
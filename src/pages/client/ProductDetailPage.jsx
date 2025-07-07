import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { addToCart } from '../../store/slices/cartSlice';
import { ArrowLeft, ArrowRight, ShoppingCart, Star, Heart, Share2 } from 'lucide-react';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  
  const product = useSelector((state) => 
    state.products.products.find(p => p.id === productId)
  );
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const isRTL = i18n.language === 'ar';

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">المنتج غير موجود</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      product_name: product.product_name,
      price: product.is_offered ? product.offered_price : product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      product_img: product.product_img,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            {isRTL ? <ArrowRight className="h-5 w-5 ml-2" /> : <ArrowLeft className="h-5 w-5 mr-2" />}
            العودة
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={product.product_img}
              alt={product.product_name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.product_name}
              </h1>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                <div className="flex items-center text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5" />
                  <span className="text-gray-600 ml-2">4.2 (127 تقييم)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                {product.is_offered ? (
                  <>
                    <span className="text-3xl font-bold text-blue-600">
                      {product.offered_price} د.م
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      {product.price} د.م
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      خصم {Math.round(((product.price - product.offered_price) / product.price) * 100)}%
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {product.price} د.م
                  </span>
                )}
              </div>

              <div className="text-gray-600 mb-6">
                <p>منتج عالي الجودة مصنوع من أفضل المواد. يتميز بتصميم أنيق وعصري يناسب جميع الأذواق.</p>
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">المقاس</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">اللون</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                        selectedColor === color
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">الكمية</h3>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                >
                  -
                </button>
                <span className="text-lg font-medium px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className={`h-3 w-3 rounded-full ${
                product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              <span className={`text-sm font-medium ${
                product.quantity > 0 ? 'text-green-700' : 'text-red-700'
              }`}>
                {product.quantity > 0 ? `متوفر (${product.quantity} قطعة)` : 'نفذ من المخزون'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{t('products.addToCart')}</span>
              </button>
              
              <button className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              
              <button className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity === 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('cart.empty')}</h2>
          <p className="text-gray-600 mb-8">لا توجد منتجات في سلة التسوق</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
          >
            <ArrowRight className="h-5 w-5 ml-2" />
            {t('cart.continue')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('cart.title')}</h1>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700 transition-colors duration-200"
          >
            مسح الكل
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <img
                    src={item.product_img}
                    alt={item.product_name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.product_name}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      {item.size && <p>المقاس: {item.size}</p>}
                      {item.color && <p>اللون: {item.color}</p>}
                    </div>
                    <p className="text-lg font-bold text-blue-600 mt-2">{item.price} د.م</p>
                  </div>

                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-red-600 hover:text-red-700 transition-colors duration-200"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">ملخص الطلب</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي</span>
                <span className="font-medium">{total} د.م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الشحن</span>
                <span className="font-medium">مجاني</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الضريبة</span>
                <span className="font-medium">{(total * 0.1).toFixed(2)} د.م</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>{t('cart.total')}</span>
                <span>{(total * 1.1).toFixed(2)} د.م</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium">
              {t('cart.checkout')}
            </button>

            <Link
              to="/"
              className="block w-full text-center text-blue-600 hover:text-blue-700 transition-colors duration-200 mt-4"
            >
              {t('cart.continue')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
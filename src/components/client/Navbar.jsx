
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Globe, Store } from 'lucide-react';

import { toggleCart } from '../../store/slices/cartSlice';

const Navbar= () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogoDoubleClick = () => {
    navigate('/admin/login');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'fr' : 'ar';
    i18n.changeLanguage(newLang);
  };

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
            onDoubleClick={handleLogoDoubleClick}
          >
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Marseille Style
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {t('home')}
            </Link>
            <Link
              to="/#categories"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {t('categories')}
            </Link>
            <Link
              to="/#products"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {t('products')}
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              title={i18n.language === 'ar' ? 'Français' : 'العربية'}
            >
              <Globe className="h-5 w-5 text-gray-700" />
            </button>

            {/* Cart */}
            <Link
              // onClick={handleCartClick}
              to={'/cart'}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
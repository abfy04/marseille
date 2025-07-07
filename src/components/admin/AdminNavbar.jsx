import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Store, LayoutDashboard, Tag, Package, LogOut, User, Menu, ChevronDown } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { useTranslation } from 'react-i18next';

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Helper for active nav link
  const isActive = (path) => location.pathname === path;

  // Language switcher
  const languages = [
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/admin" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Store className="h-7 w-7 text-blue-600" />
            <span className="font-bold text-xl text-blue-700">Marseille Admin</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link to="/admin" className={`flex items-center space-x-1 rtl:space-x-reverse font-medium ${isActive('/admin') ? 'text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-700'}` }>
              <LayoutDashboard className="h-5 w-5" />
              <span>لوحة المعلومات</span>
            </Link>
            <Link to="/admin/categories" className={`flex items-center space-x-1 rtl:space-x-reverse font-medium ${isActive('/admin/categories') ? 'text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-700'}` }>
              <Tag className="h-5 w-5" />
              <span>التصنيفات</span>
            </Link>
            <Link to="/admin/products" className={`flex items-center space-x-1 rtl:space-x-reverse font-medium ${isActive('/admin/products') ? 'text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-700'}` }>
              <Package className="h-5 w-5" />
              <span>المنتجات</span>
            </Link>
          </div>

          {/* User Info with Dropdown */}
          <div className="relative hidden md:flex items-center space-x-2 rtl:space-x-reverse" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 rtl:space-x-reverse focus:outline-none"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-500">مدير النظام</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-white border rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/admin/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  الملف الشخصي
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  تسجيل الخروج
                </button>
                <div className="border-t my-2" />
                <div className="px-4 py-1">
                  <span className="block text-xs text-gray-500 mb-1">اللغة</span>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { i18n.changeLanguage(lang.code); setDropdownOpen(false); }}
                      className={`block w-full text-right px-2 py-1 rounded text-sm ${i18n.language === lang.code ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-100 text-gray-700'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded focus:outline-none text-blue-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col space-y-1 p-4">
            <Link to="/admin" className={`flex items-center space-x-2 rtl:space-x-reverse font-medium ${isActive('/admin') ? 'text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-700'}`} onClick={() => setMenuOpen(false)}>
              <LayoutDashboard className="h-5 w-5" />
              <span>لوحة المعلومات</span>
            </Link>
            <Link to="/admin/categories" className={`flex items-center space-x-2 rtl:space-x-reverse font-medium ${isActive('/admin/categories') ? 'text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-700'}`} onClick={() => setMenuOpen(false)}>
              <Tag className="h-5 w-5" />
              <span>التصنيفات</span>
            </Link>
            <Link to="/admin/products" className={`flex items-center space-x-2 rtl:space-x-reverse font-medium ${isActive('/admin/products') ? 'text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-700'}`} onClick={() => setMenuOpen(false)}>
              <Package className="h-5 w-5" />
              <span>المنتجات</span>
            </Link>
            {/* User Info for mobile, no dropdown */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse mt-4 mb-2">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-500">مدير النظام</p>
              </div>
            </div>
            <Link
              to="/admin/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMenuOpen(false)}
            >
              الملف الشخصي
            </Link>
            <button
              onClick={() => { setMenuOpen(false); handleLogout(); }}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              تسجيل الخروج
            </button>
            <div className="border-t my-2" />
            <div className="px-4 py-1">
              <span className="block text-xs text-gray-500 mb-1">اللغة</span>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { i18n.changeLanguage(lang.code); setMenuOpen(false); }}
                  className={`block w-full text-right px-2 py-1 rounded text-sm ${i18n.language === lang.code ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar; 
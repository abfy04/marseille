import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Package, Tag, Store, LogOut, User,X } from 'lucide-react';
import { useSelector } from 'react-redux';
import React from 'react';

const AdminSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = React.useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/admin' },
    { icon: Tag, label: t('categories'), path: '/admin/categories' },
    { icon: Package, label: t('products'), path: '/admin/products' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0`}>
      <div className="flex items-center justify-between h-16 bg-blue-600 px-4">
        <div className="flex items-center">
          <Store className="h-8 w-8 text-white" />
          <span className="ml-2 text-xl font-bold text-white">Marseille Admin</span>
        </div>
        {/* Toggle button for mobile */}
        <button
          className="lg:hidden text-white text-2xl focus:outline-none"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        >
          &times;
        </button>
      </div>
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setOpen(false)}
            >
              <item.icon className="h-5 w-5 ml-3" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      {/* User info at the bottom */}
      <div className="absolute bottom-16 w-full p-4 flex items-center space-x-3 rtl:space-x-reverse">
        <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user?.username}</p>
          <p className="text-xs text-gray-500">مدير النظام</p>
        </div>
      </div>
      <div className="absolute bottom-0 w-full p-4">
        <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200">
          <LogOut className="h-5 w-5 ml-3" />
          {t('logout')}
        </button>
      </div>
      {/* Hamburger to open sidebar on mobile */}
      <button
        className="fixed top-4 -left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg lg:hidden"
        style={{ display: open ? 'none' : 'block' }}
        onClick={() => setOpen(!open)}
        aria-label="Open sidebar"
      >
        {
          !open ? (
            <X className="h-5 w-5" />
          ) : (
            <>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </>
          )
        }
      </button>
    </div>
  );
};

export default AdminSidebar;
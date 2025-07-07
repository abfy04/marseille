
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Package, Tag, Store, Settings, LogOut } from 'lucide-react';

const AdminSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/admin' },
    { icon: Tag, label: t('categories'), path: '/admin/categories' },
    { icon: Package, label: t('products'), path: '/admin/products' },
    { icon: Settings, label: 'الإعدادات', path: '/admin/settings' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0">
      <div className="flex items-center justify-center h-16 bg-blue-600">
        <Store className="h-8 w-8 text-white" />
        <span className="ml-2 text-xl font-bold text-white">Marseille Admin</span>
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
            >
              <item.icon className="h-5 w-5 ml-3" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4">
        <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200">
          <LogOut className="h-5 w-5 ml-3" />
          {t('logout')}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Bell, Search, User } from 'lucide-react';

const AdminHeader = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="البحث..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.username}</p>
              <p className="text-xs text-gray-500">مدير النظام</p>
            </div>
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
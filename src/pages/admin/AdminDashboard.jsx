import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Package, Tag, ShoppingCart, DollarSign, TrendingUp, Users, Eye, Star } from 'lucide-react';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const offeredProducts = products.filter(product => product.is_offered).length;
  const lowStockProducts = products.filter(product => product.quantity < 10).length;

  const stats = [
    {
      title: t('admin.totalProducts'),
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: t('admin.totalCategories'),
      value: totalCategories,
      icon: Tag,
      color: 'bg-green-500',
      change: '+5%',
    },
    {
      title: 'إجمالي المخزون',
      value: products.reduce((sum, product) => sum + product.quantity, 0),
      icon: ShoppingCart,
      color: 'bg-purple-500',
      change: '+8%',
    },
    {
      title: t('admin.revenue'),
      value: `${totalRevenue.toLocaleString()} د.م`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+15%',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('admin.title')}</h1>
        <div className="text-xs sm:text-sm text-gray-500">
          آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-50 text-blue-700 py-3 px-4 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-right">
              {t('admin.addProduct')}
            </button>
            <button className="w-full bg-green-50 text-green-700 py-3 px-4 rounded-lg hover:bg-green-100 transition-colors duration-200 text-right">
              {t('admin.addCategory')}
            </button>
            <button className="w-full bg-purple-50 text-purple-700 py-3 px-4 rounded-lg hover:bg-purple-100 transition-colors duration-200 text-right">
              إضافة عرض جديد
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">تحليلات سريعة</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">المنتجات المعروضة</span>
              <span className="font-semibold text-red-600">{offeredProducts}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">مخزون منخفض</span>
              <span className="font-semibold text-orange-600">{lowStockProducts}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">متوسط السعر</span>
              <span className="font-semibold text-green-600">
                {products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length) : 0} د.م
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">النشاط الأخير</h3>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
            <div className="bg-blue-500 p-2 rounded-full">
              <Package className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">تم إضافة منتج جديد</p>
              <p className="text-xs text-gray-500">منذ 5 دقائق</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
            <div className="bg-green-500 p-2 rounded-full">
              <Star className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">تم تحديث عرض خاص</p>
              <p className="text-xs text-gray-500">منذ 15 دقيقة</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
            <div className="bg-purple-500 p-2 rounded-full">
              <Eye className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">تم عرض منتج 50 مرة</p>
              <p className="text-xs text-gray-500">منذ ساعة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
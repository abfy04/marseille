import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { addProduct, updateProduct, deleteProduct } from '../../store/slices/productsSlice';
import { Plus, Edit2, Trash2, Tag, Package } from 'lucide-react';

const AdminProducts = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      dispatch(deleteProduct(id));
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.categorie_name : 'غير محدد';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{t('products')}</h1>
        <button
          onClick={() => navigate('/admin/products/add')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Plus className="h-5 w-5" />
          <span>{t('admin.addProduct')}</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  المنتج
                </th>
                <th className="hidden sm:table-cell px-2 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  التصنيف
                </th>
                <th className="px-2 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  السعر
                </th>
                <th className="hidden sm:table-cell px-2 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  الكمية
                </th>
                <th className="hidden md:table-cell px-2 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  الحالة
                </th>
                <th className="px-2 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.product_img}
                        alt={product.product_name}
                        className="h-10 w-10 md:h-12 md:w-12 rounded-lg object-cover"
                      />
                      <div className="mr-2 md:mr-4">
                        <div className="text-xs md:text-sm font-medium text-gray-900">
                          {product.product_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {product.sizes.length > 0 && `المقاسات: ${product.sizes.join(', ')}`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-2 md:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {getCategoryName(product.categorie_id)}
                    </span>
                  </td>
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs md:text-sm text-gray-900">
                      {product.is_offered ? (
                        <div>
                          <span className="font-bold text-red-600">{product.offered_price} د.م</span>
                          <span className="text-gray-400 line-through ml-2">{product.price} د.م</span>
                        </div>
                      ) : (
                        <span className="font-bold">{product.price} د.م</span>
                      )}
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-2 md:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.quantity > 10 
                        ? 'bg-green-100 text-green-800' 
                        : product.quantity > 0 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.quantity}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-2 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      {product.is_offered && (
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                          عرض
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.quantity > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.quantity > 0 ? 'متوفر' : 'نفذ'}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-1 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      {!product.is_offered && (
                        <button
                          onClick={() => handleAddOffer(product)}
                          className="text-green-600 hover:text-green-900 transition-colors duration-200"
                        >
                          <Tag className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
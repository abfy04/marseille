import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { addCategory, updateCategory, deleteCategory } from '../../store/slices/categoriesSlice';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

const AdminCategories = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التصنيف؟')) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{t('categories')}</h1>
        <button
          onClick={() => navigate('/admin/categories/add')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Plus className="h-5 w-5" />
          <span>{t('admin.addCategory')}</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="aspect-square relative">
              <img
                src={category.categorie_img}
                alt={category.categorie_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => navigate(`/admin/categories/edit/${category.id}`)}
                  className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-colors duration-200"
                >
                  <Edit2 className="h-4 w-4 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{category.categorie_name}</h3>
              {category.sizes.length > 0 && (
                <p className="text-xs sm:text-sm text-gray-600">
                  المقاسات: {category.sizes.join(', ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { addCategory, updateCategory, deleteCategory } from '../../store/slices/categoriesSlice';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

const AdminCategories = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    categorie_name: '',
    sizes: '',
    categorie_img: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = {
      id: editingCategory?.id || Date.now().toString(),
      categorie_name: formData.categorie_name,
      sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()) : [],
      categorie_img: formData.categorie_img,
    };

    if (editingCategory) {
      dispatch(updateCategory(categoryData));
    } else {
      dispatch(addCategory(categoryData));
    }

    setShowModal(false);
    setEditingCategory(null);
    setFormData({ categorie_name: '', sizes: '', categorie_img: '' });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      categorie_name: category.categorie_name,
      sizes: category.sizes.join(', '),
      categorie_img: category.categorie_img,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التصنيف؟')) {
      dispatch(deleteCategory(id));
    }
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setFormData({ categorie_name: '', sizes: '', categorie_img: '' });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{t('categories')}</h1>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Plus className="h-5 w-5" />
          <span>{t('admin.addCategory')}</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  onClick={() => handleEdit(category)}
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
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.categorie_name}</h3>
              {category.sizes.length > 0 && (
                <p className="text-sm text-gray-600">
                  المقاسات: {category.sizes.join(', ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingCategory ? 'تعديل التصنيف' : 'إضافة تصنيف جديد'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم التصنيف
                </label>
                <input
                  type="text"
                  required
                  value={formData.categorie_name}
                  onChange={(e) => setFormData({ ...formData, categorie_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المقاسات (مفصولة بفواصل)
                </label>
                <input
                  type="text"
                  value={formData.sizes}
                  onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="S, M, L, XL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رابط الصورة
                </label>
                <input
                  type="url"
                  required
                  value={formData.categorie_img}
                  onChange={(e) => setFormData({ ...formData, categorie_img: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3 rtl:space-x-reverse">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  {editingCategory ? 'تحديث' : 'إضافة'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
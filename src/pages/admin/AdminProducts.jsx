import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { addProduct, updateProduct, deleteProduct } from '../../store/slices/productsSlice';
import { Plus, Edit2, Trash2, Tag, Package } from 'lucide-react';

const AdminProducts = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    product_name: '',
    categorie_id: '',
    sizes: '',
    colors: '',
    price: '',
    quantity: '',
    is_offered: false,
    offered_price: '',
    product_img: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      id: editingProduct?.id || Date.now().toString(),
      product_name: formData.product_name,
      categorie_id: formData.categorie_id,
      sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()) : [],
      colors: formData.colors ? formData.colors.split(',').map(c => c.trim()) : [],
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      is_offered: formData.is_offered,
      offered_price: formData.offered_price ? parseFloat(formData.offered_price) : undefined,
      product_img: formData.product_img,
    };

    if (editingProduct) {
      dispatch(updateProduct(productData));
    } else {
      dispatch(addProduct(productData));
    }

    setShowModal(false);
    setEditingProduct(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      product_name: '',
      categorie_id: '',
      sizes: '',
      colors: '',
      price: '',
      quantity: '',
      is_offered: false,
      offered_price: '',
      product_img: '',
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      product_name: product.product_name,
      categorie_id: product.categorie_id,
      sizes: product.sizes.join(', '),
      colors: product.colors.join(', '),
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      is_offered: product.is_offered,
      offered_price: product.offered_price?.toString() || '',
      product_img: product.product_img,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    resetForm();
    setShowModal(true);
  };

  const handleAddOffer = (product) => {
    const offeredPrice = prompt('أدخل سعر العرض:', product.price.toString());
    if (offeredPrice && parseFloat(offeredPrice) < product.price) {
      dispatch(updateProduct({
        ...product,
        is_offered: true,
        offered_price: parseFloat(offeredPrice),
      }));
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
          onClick={handleAddNew}
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
                        onClick={() => handleEdit(product)}
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم المنتج
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.product_name}
                    onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    التصنيف
                  </label>
                  <select
                    required
                    value={formData.categorie_id}
                    onChange={(e) => setFormData({ ...formData, categorie_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر التصنيف</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categorie_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    السعر
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الكمية
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                  الألوان (مفصولة بفواصل)
                </label>
                <input
                  type="text"
                  value={formData.colors}
                  onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="أحمر, أزرق, أخضر"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رابط الصورة
                </label>
                <input
                  type="url"
                  required
                  value={formData.product_img}
                  onChange={(e) => setFormData({ ...formData, product_img: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <input
                  type="checkbox"
                  id="is_offered"
                  checked={formData.is_offered}
                  onChange={(e) => setFormData({ ...formData, is_offered: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_offered" className="text-sm font-medium text-gray-700">
                  منتج مُعرض
                </label>
              </div>
              
              {formData.is_offered && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    سعر العرض
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.offered_price}
                    onChange={(e) => setFormData({ ...formData, offered_price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              
              <div className="flex space-x-3 rtl:space-x-reverse">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  {editingProduct ? 'تحديث' : 'إضافة'}
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

export default AdminProducts;
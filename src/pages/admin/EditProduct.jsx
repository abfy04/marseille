import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct } from '../../store/slices/productsSlice';

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const product = products.find(p => p.id === id);
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
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (product) {
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
      setImagePreview(product.product_img);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      id,
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
    dispatch(updateProduct(productData));
    navigate('/admin/products');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, product_img: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!product) return <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-8">المنتج غير موجود</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h2 className="text-xl font-bold mb-4">تعديل المنتج</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">اسم المنتج</label>
            <input type="text" required value={formData.product_name} onChange={e => setFormData({ ...formData, product_name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">التصنيف</label>
            <select required value={formData.categorie_id} onChange={e => setFormData({ ...formData, categorie_id: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
              <option value="">اختر التصنيف</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.categorie_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">السعر</label>
            <input type="number" required step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الكمية</label>
            <input type="number" required value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">المقاسات (مفصولة بفواصل)</label>
          <input type="text" value={formData.sizes} onChange={e => setFormData({ ...formData, sizes: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="S, M, L, XL" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">الألوان (مفصولة بفواصل)</label>
          <input type="text" value={formData.colors} onChange={e => setFormData({ ...formData, colors: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="أحمر, أزرق, أخضر" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">صورة المنتج</label>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium border border-blue-200 transition-colors duration-200">
              اختر صورة
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {imagePreview && (
              <img src={imagePreview} alt="preview" className="h-16 w-16 object-cover rounded-lg border" />
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <input type="checkbox" id="is_offered" checked={formData.is_offered} onChange={e => setFormData({ ...formData, is_offered: e.target.checked })} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
          <label htmlFor="is_offered" className="text-sm font-medium">منتج مُعرض</label>
        </div>
        {formData.is_offered && (
          <div>
            <label className="block text-sm font-medium mb-2">سعر العرض</label>
            <input type="number" step="0.01" value={formData.offered_price} onChange={e => setFormData({ ...formData, offered_price: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </div>
        )}
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">تحديث</button>
          <button type="button" onClick={() => navigate('/admin/products')} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">إلغاء</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct; 
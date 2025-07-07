import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCategory } from '../../store/slices/categoriesSlice';

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const categories = useSelector((state) => state.categories.categories);
  const category = categories.find(c => c.id === id);
  const [formData, setFormData] = useState({
    categorie_name: '',
    sizes: '',
    categorie_img: '',
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (category) {
      setFormData({
        categorie_name: category.categorie_name,
        sizes: category.sizes.join(', '),
        categorie_img: category.categorie_img,
      });
      setImagePreview(category.categorie_img);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = {
      id,
      categorie_name: formData.categorie_name,
      sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()) : [],
      categorie_img: formData.categorie_img,
    };
    dispatch(updateCategory(categoryData));
    navigate('/admin/categories');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, categorie_img: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!category) return <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-8">التصنيف غير موجود</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h2 className="text-xl font-bold mb-4">تعديل التصنيف</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">اسم التصنيف</label>
          <input type="text" required value={formData.categorie_name} onChange={e => setFormData({ ...formData, categorie_name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">المقاسات (مفصولة بفواصل)</label>
          <input type="text" value={formData.sizes} onChange={e => setFormData({ ...formData, sizes: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="S, M, L, XL" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">صورة التصنيف</label>
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
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">تحديث</button>
          <button type="button" onClick={() => navigate('/admin/categories')} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">إلغاء</button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory; 
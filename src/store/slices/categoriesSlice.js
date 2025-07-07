import { createSlice } from '@reduxjs/toolkit';




const initialState= {
  categories: [
    {
      id: '1',
      categorie_name: 'ملابس',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      categorie_img: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      categorie_name: 'أحذية',
      sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
      categorie_img: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      categorie_name: 'ساعات',
      sizes: [],
      categorie_img: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      categorie_name: 'عطور',
      sizes: [],
      categorie_img: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addCategory, updateCategory, deleteCategory, setLoading, setError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
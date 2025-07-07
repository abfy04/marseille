import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  products: [
    {
      id: '1',
      product_name: 'قميص أنيق',
      categorie_id: '1',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['أزرق', 'أسود', 'أبيض'],
      price: 120,
      quantity: 50,
      is_offered: true,
      offered_price: 90,
      product_img: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      product_name: 'حذاء رياضي',
      categorie_id: '2',
      sizes: ['40', '41', '42', '43'],
      colors: ['أسود', 'أبيض', 'أزرق'],
      price: 200,
      quantity: 30,
      is_offered: false,
      product_img: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      product_name: 'ساعة كلاسيكية',
      categorie_id: '3',
      sizes: [],
      colors: ['ذهبي', 'فضي', 'أسود'],
      price: 300,
      quantity: 20,
      is_offered: true,
      offered_price: 250,
      product_img: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      product_name: 'عطر فاخر',
      categorie_id: '4',
      sizes: [],
      colors: [],
      price: 150,
      quantity: 40,
      is_offered: false,
      product_img: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ],
  loading: false,
  error: null,
  selectedCategory: null,
  searchQuery: '',
  filteredProducts: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    filterProducts: (state) => {
      let filtered = state.products;
      
      if (state.selectedCategory) {
        filtered = filtered.filter(product => product.categorie_id === state.selectedCategory);
      }
      
      if (state.searchQuery) {
        filtered = filtered.filter(product => 
          product.product_name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
      
      state.filteredProducts = filtered;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  setSelectedCategory, 
  setSearchQuery, 
  filterProducts, 
  setLoading, 
  setError 
} = productsSlice.actions;
export default productsSlice.reducer;
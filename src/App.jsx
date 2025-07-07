import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useTranslation } from 'react-i18next';
import './i18n';

// Client Components
import ClientLayout from './components/client/ClientLayout';
import HomePage from './pages/client/HomePage';
import CategoryPage from './pages/client/CategoryPage';
import ProductDetailPage from './pages/client/ProductDetailPage';
import CartPage from './pages/client/CartPage';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProducts from './pages/admin/AdminProducts';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  const { i18n } = useTranslation();

  // Set RTL for Arabic
  React.useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Client Routes */}
            <Route path="/" element={<ClientLayout />}>
              <Route index element={<HomePage />} />
              <Route path="category/:categoryId" element={<CategoryPage />} />
              <Route path="product/:productId" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="products" element={<AdminProducts />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
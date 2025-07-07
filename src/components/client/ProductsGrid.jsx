
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { addToCart } from '../../store/slices/cartSlice';
import { ShoppingCart, Eye, Star, Tag } from 'lucide-react';

const ProductsGrid = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const filteredProducts = useSelector((state) => state.products.filteredProducts);
  const selectedCategory = useSelector((state) => state.products.selectedCategory);
  const searchQuery = useSelector((state) => state.products.searchQuery);

  const displayProducts = selectedCategory || searchQuery ? filteredProducts : products;

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      product_name: product.product_name,
      price: product.is_offered ? product.offered_price : product.price,
      quantity: 1,
      product_img: product.product_img,
    }));
  };

  return (
    <section className="py-16 bg-gray-50" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('products.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اكتشف منتجاتنا المميزة والحصرية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="aspect-square relative overflow-hidden group">
                <img
                  src={product.product_img}
                  alt={product.product_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Offer Badge */}
                {product.is_offered && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {t('products.offer')}
                  </div>
                )}

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 rtl:space-x-reverse">
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Eye className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.quantity === 0}
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.product_name}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {product.is_offered ? (
                      <>
                        <span className="text-2xl font-bold text-blue-600">
                          {product.offered_price} د.م
                        </span>
                        <span className="text-gray-400 line-through text-sm">
                          {product.price} د.م
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">
                        {product.price} د.م
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    product.quantity > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.quantity > 0 ? `متوفر (${product.quantity})` : t('products.outOfStock')}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.quantity === 0}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {t('products.addToCart')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد منتجات متاحة</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsGrid;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ar: {
    translation: {
      // Navigation
      'home': 'الرئيسية',
      'categories': 'التصنيفات',
      'products': 'المنتجات',
      'cart': 'السلة',
      'admin': 'لوحة التحكم',
      'dashboard': 'لوحة المعلومات',
      'logout': 'تسجيل الخروج',
      
      // Hero Section
      'hero.title': 'مرحباً بكم في مارسيليا ستايل',
      'hero.subtitle': 'اكتشف أحدث صيحات الموضة والأناقة',
      'hero.cta': 'تسوق الآن',
      
      // Categories
      'categories.title': 'التصنيفات',
      'categories.viewAll': 'عرض الكل',
      
      // Products
      'products.title': 'المنتجات',
      'products.addToCart': 'أضف إلى السلة',
      'products.offer': 'عرض خاص',
      'products.outOfStock': 'نفذ من المخزون',
      'products.viewDetails': 'عرض التفاصيل',
      
      // Search & Filter
      'search.placeholder': 'البحث عن المنتجات...',
      'filter.priceRange': 'نطاق السعر',
      'filter.apply': 'تطبيق',
      'filter.clear': 'مسح',
      
      // Cart
      'cart.title': 'سلة التسوق',
      'cart.empty': 'السلة فارغة',
      'cart.total': 'المجموع',
      'cart.checkout': 'الدفع',
      'cart.continue': 'متابعة التسوق',
      
      // Admin
      'admin.title': 'لوحة التحكم',
      'admin.totalProducts': 'إجمالي المنتجات',
      'admin.totalCategories': 'إجمالي التصنيفات',
      'admin.totalOrders': 'إجمالي الطلبات',
      'admin.revenue': 'الإيرادات',
      'admin.addProduct': 'إضافة منتج',
      'admin.addCategory': 'إضافة تصنيف',
      'admin.edit': 'تعديل',
      'admin.delete': 'حذف',
      'admin.addOffer': 'إضافة عرض',
      
      // Forms
      'form.name': 'الاسم',
      'form.price': 'السعر',
      'form.quantity': 'الكمية',
      'form.category': 'التصنيف',
      'form.sizes': 'المقاسات',
      'form.colors': 'الألوان',
      'form.image': 'الصورة',
      'form.save': 'حفظ',
      'form.cancel': 'إلغاء',
      
      // Common
      'loading': 'جاري التحميل...',
      'error': 'خطأ',
      'success': 'تم بنجاح',
      'confirm': 'تأكيد',
      'yes': 'نعم',
      'no': 'لا',
    }
  },
  fr: {
    translation: {
      // Navigation
      'home': 'Accueil',
      'categories': 'Catégories',
      'products': 'Produits',
      'cart': 'Panier',
      'admin': 'Tableau de bord',
      'dashboard': 'Tableau de bord',
      'logout': 'Déconnexion',
      
      // Hero Section
      'hero.title': 'Bienvenue chez Marseille Style',
      'hero.subtitle': 'Découvrez les dernières tendances mode et élégance',
      'hero.cta': 'Acheter maintenant',
      
      // Categories
      'categories.title': 'Catégories',
      'categories.viewAll': 'Voir tout',
      
      // Products
      'products.title': 'Produits',
      'products.addToCart': 'Ajouter au panier',
      'products.offer': 'Offre spéciale',
      'products.outOfStock': 'Rupture de stock',
      'products.viewDetails': 'Voir les détails',
      
      // Search & Filter
      'search.placeholder': 'Rechercher des produits...',
      'filter.priceRange': 'Gamme de prix',
      'filter.apply': 'Appliquer',
      'filter.clear': 'Effacer',
      
      // Cart
      'cart.title': 'Panier',
      'cart.empty': 'Panier vide',
      'cart.total': 'Total',
      'cart.checkout': 'Commander',
      'cart.continue': 'Continuer les achats',
      
      // Admin
      'admin.title': 'Tableau de bord',
      'admin.totalProducts': 'Total des produits',
      'admin.totalCategories': 'Total des catégories',
      'admin.totalOrders': 'Total des commandes',
      'admin.revenue': 'Chiffre d\'affaires',
      'admin.addProduct': 'Ajouter un produit',
      'admin.addCategory': 'Ajouter une catégorie',
      'admin.edit': 'Modifier',
      'admin.delete': 'Supprimer',
      'admin.addOffer': 'Ajouter une offre',
      
      // Forms
      'form.name': 'Nom',
      'form.price': 'Prix',
      'form.quantity': 'Quantité',
      'form.category': 'Catégorie',
      'form.sizes': 'Tailles',
      'form.colors': 'Couleurs',
      'form.image': 'Image',
      'form.save': 'Enregistrer',
      'form.cancel': 'Annuler',
      
      // Common
      'loading': 'Chargement...',
      'error': 'Erreur',
      'success': 'Succès',
      'confirm': 'Confirmer',
      'yes': 'Oui',
      'no': 'Non',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
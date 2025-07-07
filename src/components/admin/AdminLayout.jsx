
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout= () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="lg:ml-64">
        <AdminHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ClientLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
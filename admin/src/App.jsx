import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/admin/Dashboard'
import AddSubadmin from './pages/admin/AddSubadmin'
import Menu from './pages/admin/Menu'
import AddMenu from './pages/admin/AddMenu'
import AcceptedOrders from './pages/admin/AcceptedOrders'
import Categories from './pages/admin/Categories'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import AdminContextProvider from './context/AdminContext'
import AcceptOrder from './pages/admin/AcceptOrder'
import { SubAdminContext } from './context/SubAdminContext'
import Inventory from './pages/admin/Inventory'

const App = () => {
  const { aToken, maToken, saToken } = useContext(AdminContext);
  // const { saToken } = useContext(SubAdminContext);

  const isSuperAdmin = !!aToken;
  const isSubAdmin = !!saToken;
  const isMenuAdmin = !!maToken;

  return (isSuperAdmin || isSubAdmin || isMenuAdmin) ? (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <Navbar />
      <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
        <Routes>
          {isMenuAdmin ? (
            // Only allow /admin/menu for menu admin
            <>
              <Route path="/admin/menu" element={<Menu />} />
              <Route path="*" element={<Navigate to="/admin/menu" replace />} />
            </>
          ) : (
            // Allow full admin/subadmin access
            <>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/accept-order" element={<AcceptOrder />} />
              <Route path="/admin/menu" element={<Menu />} />
              <Route path="/admin/add-menu" element={<AddMenu />} />
              <Route path="/admin/accepted-orders" element={<AcceptedOrders />} />
              <Route path="/admin/add-subadmin" element={<AddSubadmin />} />
              <Route path="/admin/categories" element={<Categories />} />
              <Route path="/admin/inventory" element={<Inventory />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              
            </>
          )}
        </Routes>
      </main>
    </div>
  ) : (
    // Not logged in
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
};


const AppWithContext = () => (
  <AdminContextProvider>
    <App />
  </AdminContextProvider>
);

export default AppWithContext;
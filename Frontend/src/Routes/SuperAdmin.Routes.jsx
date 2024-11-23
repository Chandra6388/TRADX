import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboards from '../components/superAdmin/dashboard/Dashboard';
import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
import AdminDetails from '../components/superAdmin/adminDetails/Admindetails';
import CreateAdmin from '../components/superAdmin/accountCreate/CreateAccount';


const SuperAdminRoute = () => {
  return (
    <>
      <div className='wrapper'>
        <Sidebar />
        <div id="content-page" className="content-page">
          <Header />
          <Routes>
            <Route path="/dashboard" element={<Dashboards />} />
            <Route path="/admin-details" element={<AdminDetails />} />
            <Route path="/create-admin" element={<CreateAdmin />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default SuperAdminRoute;

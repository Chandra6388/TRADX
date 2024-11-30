import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
// import AddClient from '../components/subadmin/Client/AddClient';
import AddClient from '../components/subadmin/Client/AddClient';
import AllClient from '../components/subadmin/Client/Allclient';
import Dashboard from '../components/subadmin/subadminDashboard/Dashboard';

const SubAdminRoutes = () => {
  return (
    <div className='wrapper'>
    <Sidebar />
    <div id="content-page" className="content-page">
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addclient" element={<AddClient />} />
        <Route path="/allclient" element={<AllClient />} />

      </Routes>

    </div>
  </div>
  )
}

export default SubAdminRoutes
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
import Dashboard from '../components/subadmin/subadminDashboard/Dashboard';
import AddClient from '../components/subadmin/Client/AddClient';

const SubAdminRoutes = () => {
  return (
    <div className='wrapper'>
    <Sidebar />
    <div id="content-page" className="content-page">
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addclient" element={<AddClient />} />

      </Routes>

    </div>
  </div>
  )
}

export default SubAdminRoutes
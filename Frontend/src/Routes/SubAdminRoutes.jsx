import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
// import AddClient from '../components/subadmin/Client/AddClient';
import AddClient from '../components/subAdmin/Client/AddClient';
import AllClient from '../components/subAdmin/Client/Allclient';
import Dashboard from '../components/subAdmin/subadminDashboard/Dashboard';

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
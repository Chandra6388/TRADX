import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
import Dashboard from '../components/subAdmin/subadminDashboard/Dashboard';
import AddClient from '../components/subAdmin/Client/AddClient';
import AllClient from '../components/subAdmin/Client/Allclient';
import SubAdminGroups from '../components/subAdmin/Groups/StrategyGroup';
import TradeHistory from '../components/subAdmin/TradeHistory/Tradehistory';
import Signals from '../components/subAdmin/Signals/TradeReport';

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
        <Route path="/groups" element={<SubAdminGroups />} />
        <Route path="/trade-history" element={<TradeHistory />} />
        <Route path="/signals" element={<Signals />} />

      </Routes>

    </div>
  </div>
  )
}

export default SubAdminRoutes
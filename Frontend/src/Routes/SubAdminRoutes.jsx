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
import AddscriptScalping from '../components/subAdmin/SubAdminScript/Addscript.Scalping';
import PatternScript from '../components/subAdmin/SubAdminScript/AddScript.Pattern';
import AddScriptOption from '../components/subAdmin/SubAdminScript/AddScript.Option';
import AllScript from '../components/subAdmin/SubAdminScript/AllScript';


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
          <Route path="/addscript/scalping" element={<AddscriptScalping />} />
          <Route path="/addscript/pattern" element={<PatternScript />} />
          <Route path="/addscript/option" element={<AddScriptOption />} />
          <Route path="/all-script" element={<AllScript />} />

        </Routes>

      </div>
    </div>
  )
}

export default SubAdminRoutes
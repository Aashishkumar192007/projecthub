import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Dashboard from './views/Dashboard';
import BrokerList from './views/BrokerList';
import PropertyRegistry from './views/modules/PropertyRegistry';
import ConstructionProjects from './views/modules/ConstructionProjects';
import Warehouses from './views/modules/Warehouses';
import Employees from './views/modules/Employees';
import Attendance from './views/modules/Attendance';
import Visitors from './views/modules/Visitors';
import Vendors from './views/modules/Vendors';
import Inventory from './views/modules/Inventory';
import Equipment from './views/modules/Equipment';
import Budget from './views/modules/Budget';
import Documents from './views/modules/Documents';
import Guarantors from './views/modules/Guarantors';
import Commissions from './views/modules/Commissions';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'brokers': return <BrokerList />;
      case 'registry': return <PropertyRegistry />;
      case 'construction': return <ConstructionProjects />;
      case 'warehouses': return <Warehouses />;
      case 'employees': return <Employees />;
      case 'attendance': return <Attendance />;
      case 'visitors': return <Visitors />;
      case 'vendors': return <Vendors />;
      case 'inventory': return <Inventory />;
      case 'equipment': return <Equipment />;
      case 'budget': return <Budget />;
      case 'documents': return <Documents />;
      case 'guarantors': return <Guarantors />;
      case 'commissions': return <Commissions />;
      default: return <div>Coming Soon</div>;
    }
  };

  return (
    <MainLayout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </MainLayout>
  );
}

export default App;

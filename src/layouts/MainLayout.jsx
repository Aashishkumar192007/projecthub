import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

const MainLayout = ({ children, activeView, setActiveView }) => {
  return (
    <div className="layout">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="main-content">
        <Header />
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

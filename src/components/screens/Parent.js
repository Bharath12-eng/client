import React, { useState } from 'react';
import AddEmployees from './addEmployees';
import Qualification from './qualifications';
import './Parent.css'

// Example components for rendering in tabs


const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(1);

  const renderTabContent = () => {
    if (activeTab === 1) {
      // Condition for Tab 1
      return <AddEmployees/>;
    } else if (activeTab === 2) {
      // Condition for Tab 2
      return <Qualification />;
    } else if (activeTab === 3) {
      // Condition for Tab 3
      return null;
    } else {
      // Default case or additional conditions
      return null;
    }
  };

  return (
    <div className="tab-container">
    <div className="tab-buttons">
        <button onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
            PersonalDetails
        </button>
        <button onClick={() => setActiveTab(2)} className={activeTab === 2 ? 'active' : ''}>
           Qualification
        </button>
        <button onClick={() => setActiveTab(3)} className={activeTab === 3 ? 'active' : ''}>
          Tab 3
        </button>
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default TabComponent;

import React from 'react';
import styles from './MainLayout.css';

function MainLayout({ children, location }) {
  return (
    <div className="laygout">
      {children}
    </div>
  );
}

export default MainLayout;

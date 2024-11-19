import React from 'react';

const Header: React.FC = () => (
  <header className="header">
    <div className="header-content">
      <h1 className="header-title">
        Tables<span className="highlight">4U</span>
      </h1>
      <div className="header-buttons">
        <button className="header-button">Login</button>
        <button className="header-button">Create A Restaurant</button>
      </div>
    </div>
  </header>
);

export default Header;

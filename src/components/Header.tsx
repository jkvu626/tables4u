import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => (
  <header className="header">
    <div className="header-content">
      <h1 className="header-title">
        Tables<span className="highlight">4U</span>
      </h1>
      <div className="header-buttons">
        <button className="header-button">Login</button>
        <Link href="/create" className="header-button">
          Create Restaurant
        </Link>
      </div>
    </div>
  </header>
);

export default Header;

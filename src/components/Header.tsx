import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => (
  <header className="header">
    <div className="header-content">
      <h1 className="header-title">
        <Link href="/"  style={{ textDecoration: 'none', color: 'inherit'}}>Tables<span className="highlight">4U</span></Link>
      </h1>
      <div className="header-buttons">
        <Link href="/login" className="header-button">
          Log In
        </Link>
        <Link href="/create" className="header-button">
          Create Restaurant
        </Link>
      </div>
    </div>
  </header>
);

export default Header;

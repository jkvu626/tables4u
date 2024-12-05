'use client'
import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';

const Header: React.FC = () => {
  const { credential, setCredential } = useAuth()
  return(
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          <Link href="/"  style={{ textDecoration: 'none', color: 'inherit'}}>Tables<span className="highlight">4U</span></Link>
        </h1>
        <div className="header-buttons">
          <Link href="/login" className="header-button" onClick={() => {if(credential){setCredential(''); document.cookie='credential=\'\''}}}>
            {credential ? 'Log Out' : 'Log In'}
          </Link>
          {!credential &&
            <Link href="/create" className="header-button">
              Create Restaurant
            </Link>
          }
        </div>
      </div>
    </header>
  );
}


export default Header;

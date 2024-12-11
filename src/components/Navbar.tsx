'use client'
import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';

const Navbar: React.FC = () => {
  const { admin, credential } = useAuth()
  return(
    <nav className="navbar">
      {admin && <Link href="/admin" className="nav-link">
        Admin
      </Link>}
      {!admin && credential && <Link href="/manage" className="nav-link">
        Manage
      </Link>}
      <Link href="/search" className="nav-link">
        Search restaurants
      </Link>
    </nav>
  );
}


export default Navbar;

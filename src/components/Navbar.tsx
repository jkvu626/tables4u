'use client'
import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';

const Navbar: React.FC = () => {
  const { admin, credential } = useAuth()
  return(
    <nav className="navbar">
      {<Link href={credential ? (admin ? '/admin' : '/manage') : '/'} className="nav-link">
        {credential ? (admin ? 'Admin Dashboard' : 'Restaurant Dashboard') : 'Home'}
      </Link>}
    </nav>
  );
}


export default Navbar;

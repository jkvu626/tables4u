import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => (
  <nav className="navbar">
    <Link href="/" className="nav-link">
      Reservations
    </Link>
    <Link href="/search" className="nav-link">
      Search
    </Link>
  </nav>
);

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center shadow-sm">
    <Link to="/" className="text-2xl font-bold tracking-tighter text-blue-900">
      MZALENDO<span className="text-blue-500 font-light italic">LUXE</span>
    </Link>
    <div className="hidden md:flex space-x-8 font-medium text-gray-600">
      <Link to="/" className="hover:text-blue-600 transition">Home</Link>
      <Link to="/about" className="hover:text-blue-600 transition">About</Link>
      <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
    </div>
  </nav>
);

export default Navbar;
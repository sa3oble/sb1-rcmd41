import React from 'react';
import { Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Newspaper className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">PressFlow</span>
          </Link>
          <nav className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/archive" className="text-gray-600 hover:text-gray-900">Archive</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
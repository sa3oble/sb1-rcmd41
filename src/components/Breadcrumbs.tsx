import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="flex px-4 py-2 text-sm text-gray-600">
      <Link to="/" className="hover:text-blue-600">Home</Link>
      {paths.map((path, index) => (
        <React.Fragment key={path}>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link
            to={`/${paths.slice(0, index + 1).join('/')}`}
            className="hover:text-blue-600 capitalize"
          >
            {path.replace(/-/g, ' ')}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
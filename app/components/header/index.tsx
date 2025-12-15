import { Header, HeaderHandle } from '@aic-kits/react';
import { useLocation, useNavigate } from '@remix-run/react';
import { useCallback, useMemo, useRef } from 'react';

import { DROPDOWN_NAV_ITEMS, NAV_ITEMS } from './constants';

import { Link, NavLink } from "@remix-run/react";


export const AppHeader = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const pathname = location.pathname;

  const headerRef = useRef<HeaderHandle>(null)
  const handleLogout = useCallback(async () => {
    headerRef.current?.hideDropdown()
  }, []);

  const headerProps = useMemo(() => ({
    navItems: NAV_ITEMS.map((item) => ({
      ...item,
      isActive: item.path === pathname,
      onClick: () => navigate(item.path),
    })),
    isSignedIn: false,
    onSignInClick: () => navigate('/login'),
    onRegisterClick: () => navigate('/register'),
    onLogoClick: () => navigate('/'),
    profileDropdownItems: [
      ...DROPDOWN_NAV_ITEMS.map((item) => ({
        ...item,
        isActive: item.path === pathname,
        onClick: () => navigate(item.path),
      })),
      {
        label: 'Logout',
        onClick: handleLogout,
      }
    ],
  }), [handleLogout, navigate, pathname]);
	
  // return <Header {...headerProps} />;
  return (
    <header className="border-b bg-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-blue-600">
           AIC Academy
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-6">
          <NavLink 
            to="/courses"
            className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-500"}
          >
            Courses
          </NavLink>
          
          <NavLink 
            to="/meta"
            className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-500"}
          >
            Meta Management
          </NavLink>
        </nav>

        {/* User Actions (nếu có) */}
        <div>
           {/* Avatar / Login button */}
        </div>
      </div>
    </header>
  );
}

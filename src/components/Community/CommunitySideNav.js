import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import '../../styles/MyPage.css';

function CommunitySideNav({ userName, profileImage }) {

  const location = useLocation();

  const isEditProfileActive = () => {
    return location.pathname === '/edit-profile' || location.pathname === '/profile-edit-in' || location.pathname === '/edit-email';
  };

  return (
  <aside>
    <nav>
        <NavLink 
        to="/free" 
        className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
        ·자유
        </NavLink>
        <NavLink 
        to="/question" 
        className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
        ·질문
        </NavLink>
        <NavLink 
        to="/gathering" 
        className={isEditProfileActive() ? 'active-link' : 'inactive-link'}>
        ·모집
        </NavLink>
    </nav>
    </aside>
  );
}

export default CommunitySideNav;
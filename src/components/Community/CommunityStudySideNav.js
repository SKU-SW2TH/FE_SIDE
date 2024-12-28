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
        to="/study" 
        className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
        ·참여하기
        </NavLink>
        <NavLink 
        to="/group" 
        className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
        ·나의 그룹
        </NavLink>
        <NavLink 
        to="/invited" 
        className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
        ·받은 초대
        </NavLink>
    </nav>
    </aside>
  );
}

export default CommunitySideNav;
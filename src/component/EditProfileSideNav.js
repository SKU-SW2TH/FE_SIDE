// MyPageSideNav.js
import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import '../styles/MyPage.css';

function EditProfileSideNav({ userName, profileImage }) {

  const location = useLocation();

  const isEditProfileActive = () => {
    return location.pathname === '/edit-profile' || location.pathname === '/profile-edit-in' || location.pathname === '/edit-email';
  };

  return (
      <aside>
        <nav>
      <NavLink 
        to="/mypage" 
        className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
        ·홈
      </NavLink>
      <NavLink 
          to="/edit-profile" 
          className={isEditProfileActive() ? 'active-link' : 'inactive-link'}>
          ·계정정보
        </NavLink>
      <NavLink 
        to="/edit-notification" 
        className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
        ·알림설정
      </NavLink>
    </nav>
      </aside>
  );
}

export default EditProfileSideNav;
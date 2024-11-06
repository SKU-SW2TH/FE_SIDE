// MyPageSideNav.js
import { NavLink} from 'react-router-dom';
import React from 'react';
import '../../styles/MyPage.css';

function MyPageSideNav() {
  return (
      <aside>
        <nav className='side-nav-grid'>
          <p className='category'>카테고리</p>
          <NavLink 
            to="/mypage" 
            className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
            ·계정정보
          </NavLink>
          <NavLink 
              to="/interest" 
              className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
              ·관심분야
          </NavLink>
          <NavLink 
            to="/notification" 
            className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
            ·알림
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

export default MyPageSideNav;
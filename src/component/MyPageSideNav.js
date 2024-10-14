// MyPageSideNav.js
import { Link } from 'react-router-dom';
import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import '../styles/MyPage.css';

function MyPageSideNav({ userName, profileImage }) {

  const location = useLocation();

  const isHomeActive = () => {
    return location.pathname === '/mypage' || location.pathname === '/write-introduce';
  };


  return (
      <aside>
        <img className="profileImage" alt="프로필 사진" src={profileImage || 'img/default-profile.png'} />
        <p className='userName'>{userName}</p>
          <Link className="btn-link" to="/edit-profile"><button className='editBtn'>수정하기</button></Link>

          <nav className='nav-link'>
            <NavLink 
          to="/mypage" 
          className={isHomeActive() ? 'active-link' : 'inactive-link'}>
          ·홈
        </NavLink>
            <NavLink 
              to="/mypage-free" 
              className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
              ·자유 게시글
            </NavLink>
            <NavLink 
              to="/mypage-question" 
              className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
              ·질문 게시글
            </NavLink>
            <NavLink 
              to="/mypage-study" 
              className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
              ·스터디 게시글
            </NavLink>
            <NavLink 
              to="/mypage-friend" 
              className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
              ·친구 목록
            </NavLink>
          </nav>
      </aside>
  );
}

export default MyPageSideNav;
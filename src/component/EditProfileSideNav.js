// MyPageSideNav.js
import { Link } from 'react-router-dom';
import React from 'react';
import './MyPage.css';

function EditProfileSideNav({ userName, profileImage }) {
  return (
      <aside>
        <Link className="mypage-navbar" to="/mypage">홈</Link>
        <Link className="mypage-navbar" to="/edit-profile">계정정보</Link>
        <Link className="mypage-navbar" to="/edit-notification">알림설정</Link>
      </aside>
  );
}

export default EditProfileSideNav;
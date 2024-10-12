// MyPageSideNav.js
import { Link } from 'react-router-dom';
import React from 'react';
import './MyPage.css';

function MyPageSideNav({ userName, profileImage }) {
  return (
      <aside>
        <img className="profileImage" alt="프로필 사진" src={profileImage || 'img/default-profile.png'} />
        <p className='userName'>{userName}</p>
          <Link className="btn-link" to="/edit-profile"><button className='editBtn'>수정하기</button></Link>

        <Link className="mypage-navbar" to="/mypage">홈</Link>
        <Link className="mypage-navbar" to="/mypage-free">자유 게시글</Link><br />
        <Link className="mypage-navbar" to="/mypage-question">질문 게시글</Link><br />
        <Link className="mypage-navbar" to="/mypage-study">스터디 게시글</Link><br />
        <Link className="mypage-navbar" to="/mypage-friend">친구 목록</Link>
      </aside>
  );
}

export default MyPageSideNav;
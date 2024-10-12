import React from 'react';
import { Link } from 'react-router-dom';
import MyPageSideNav from './MyPageSideNav';
import './MyPage.css';

const WriteIntroduce = () => {
  return (
    <div className='container'>
      <MyPageSideNav userName="박범준" profileImage="img/image.png" />
      <div>
        <p className='introduce-header'>소개</p>
        <textarea type="text" id="mypage-edit" placeholder="나만의 스킬, 깃허브 링크 등으로 소개글을 채워보세요."/>
        <Link id="btn-link" to="/mypage"><button className="profile-edit-button-formypage">저장</button></Link>
      </div>
    </div>
  );
};

export default WriteIntroduce;

import React from 'react';
import { Link } from 'react-router-dom';
import MyPageSideNav from './MyPageSideNav';

const MyPage = () => {
  return (
    <div className='container'>
      <MyPageSideNav userName="박범준" profileImage="img/image.png" />
      <div>
        <p className='introduce-header'>소개</p>
        <Link className="btn-link" to="/write-introduce"><button className='write'>작성하기</button></Link>
        <div><img src='img/neko.png' /></div>
        <p>소개글이 비었어요.</p>
        <p className='subText'>나만의 게시글 깃허브 링크로 채워보아요.</p>
      </div>
    </div>
  );
};

export default MyPage;

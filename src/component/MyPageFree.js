import React from "react";
import "../styles/MyPage.css"
import { Link } from 'react-router-dom';
import MyPageSideNav from './MyPageSideNav';

function MyPageFree() {
    return(
    <div className='container'>
        <MyPageSideNav userName="박범준" profileImage="img/image.png" />
        <div>
          <p className='introduce-header'>자유 게시글</p>
          <Link className="btn-link" to="/edit-profile"><button className='write'>자유 게시판 둘러보기</button></Link>
          <div className='mypage-img'><img src='img/neko.png' /></div>
          <p className='subText01'>작성한 게시글이 없어요.</p>
          <p className='subText02'>커뮤니티 활동을 시작해 보아요.</p>
        </div>
    </div>
    );
}

export default MyPageFree;
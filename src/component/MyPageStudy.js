import React from "react";
import "./MyPage.css"
import { Link } from 'react-router-dom';
import MyPageSideNav from './MyPageSideNav';

function MyPageStudy() {
    return(
    <div className='container'>
        <MyPageSideNav userName="박범준" profileImage="img/image.png" />
        <div>
          <p className='introduce-header'>스터디 게시글</p>
          <Link className="btn-link" to="/edit-profile"><button className='write'>스터디 게시판 둘러보기</button></Link>
          <div><img src='img/neko.png' /></div>
          <p>작성한 게시글이 없어요.</p>
          <p className='subText'>커뮤니티 활동을 시작해 보아요.</p>
        </div>
    </div>
    );
}

export default MyPageStudy;
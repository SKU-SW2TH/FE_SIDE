import React from "react";
import "../../styles/MyPage.css"
import { Link } from 'react-router-dom';

function MyPageQuestion() {
    return(
    <div className='container'>
        <div>
        <p className='introduce-header'>질문 게시글</p>
        <Link className="btn-link" to="/edit-profile"><button className='write'>질문 게시판 둘러보기</button></Link>
        <div className='center-img'>
            <div className='mypage-img'><img src='img/neko.png' /></div>
            <p className='subText01'>작성한 게시글이 없어요.</p>
            <p className='subText02'>커뮤니티 활동을 시작해 보아요.</p>
        </div>
        </div>
    </div>
    );
}

export default MyPageQuestion;
import React from "react";
import "../../styles/MyPage.css"
import { Link } from 'react-router-dom';
import MyPageSideNav from '../ReusableComponents/MyPageSideNav';

function MyPageFriend() {
    return(
    <div className='container'>
        <MyPageSideNav userName="박범준" profileImage="img/image.png" />
        <div>
        <p className='introduce-header'>친구 목록</p>
        <div className='mypage-img-forfriend'><img src='img/neko.png' /></div>
        <p className='subText01'>친구 목록에 추가된 친구가 없어요.</p>
        <p className='subText02'>친구 추가를 통해 친구 목록에 추가 할 수 있어요.</p>
        </div>
    </div>
    );
}

export default MyPageFriend;
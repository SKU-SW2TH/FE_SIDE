import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import LoginPopup from './LoginPopup'; // 로그인 팝업 컴포넌트 가져오기
import '../styles/Nav.css';

function Nav() {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  // 팝업 열기
  const openLoginPopup = () => {
    setIsLoginPopupOpen(true);
  };

  // 팝업 닫기
  const closeLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

    return(
        <div className='navbar'>
            <Link className='navbarMenu' to={'/'}>Main</Link>
            <Link className='navbarMenu' to={'/mypage'}>MyPage</Link>
            <Link className='navbarMenu' to={'/question'}>CommunityQuestion</Link>
            <Link className='navbarMenu' to={'/free'}>CommunityFree</Link>
            <Link className='navbarMenu' to={'/gathering'}>CommunityGathering</Link>
            <Link className="navbarMenu" onClick={openLoginPopup}>Login</Link>
            {/* 로그인 팝업을 조건부로 렌더링 */}
            {isLoginPopupOpen && <LoginPopup closePopup={closeLoginPopup} />}
        </div>
    )
}


export default Nav;
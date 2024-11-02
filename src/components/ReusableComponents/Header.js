import React, {useState} from 'react';
import '../../styles/Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/headerlogo.png';
import LoginPopup from "../MyPage/LoginPopup";
import "../../styles/LoginPopup.css";

function Header() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('박범준'); // 로그인 후 닉네임 예시

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleLogin = () => {
    // 로그인 로직 처리 후 로그인 상태 업데이트
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // 로그아웃 로직 처리 후 상태 초기화
    setIsLoggedIn(false);
  };
  
  return (
    <header className="App-header">
      <Link to={'/'}>
        <img
          src={logo}
          alt="logo 이미지"
          className="logo-image"
        />
      </Link>
      <nav className="navbar">
        <ul>
          <li><a href="#lectures">강의</a></li>
          <li><Link to="/StudyGroup/Calendar">스터디</Link></li>
          <li><a href="#mentoring">멘토링</a></li>
          <li><Link to="/free">커뮤니티</Link></li>
          <li><Link to="/mypage">마이페이지</Link></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        
        {isLoggedIn ? (
            <>
              {/* 로그인 후 화면 */}
              <li><a href="/mypage">My Page</a></li>
              <li><span>{username}님</span></li>
              <li><button onClick={handleLogout}>로그아웃</button></li>
            </>
          ) : (
            <>
              {/* 로그인 전 화면 */}
              <button className="login" onClick={openPopup}>로그인</button>
              <Link to="/signup" className='signup-button'><button className="signup">회원가입</button></Link>
              {isPopupOpen && <LoginPopup closePopup={closePopup} />}
            </>
          )}
      </div>
    </header>
  );
}

export default Header;

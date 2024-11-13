import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../../styles/Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/headerlogo.png';
import LoginPopup from "../MyPage/LoginPopup";
import "../../styles/LoginPopup.css";
import profileImage from '../../assets/images/image.png';
import axios from 'axios';

function Header() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 로드될 때 `localStorage`에서 토큰을 확인하여 로그인 상태를 결정합니다.
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);  // 한 번만 실행, 즉 페이지 렌더링 시

  const handleImageClick = () => {
    navigate('/mypage'); // 이동할 페이지 경로
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  
  const handleLogout = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('refreshToken');

    try {
        const response = await axios.post(
            'http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/auth/logout',
            {
              refreshToken: token  // refreshToken이라는 키로 token 값을 전송
            }
        );

        if (response.status === 200) {
            // 로그아웃 시 `localStorage`에서 토큰 삭제 후 상태 초기화
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            console.log(response.status);
            setIsLoggedIn(false);
            navigate('/');
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 500) {
              alert("서버 에러가 발생했습니다.");
              console.log(error.response.status);
            } 
        }
    }
  };
  
  const handleLoginSuccess = () => {
    // 로그인 성공 후 상태를 업데이트
    setIsLoggedIn(true);
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
        </ul>
      </nav>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            {/* 로그인 후 화면 */}
          <div className="profile-container">
            <img
            src={profileImage}
            alt="profile-image"
            className="header-profile-image"
            onClick={handleImageClick}
          /> 
          <span className="hover-text">마이페이지</span>
          </div>
          <button onClick={handleLogout} className='logout-button'>로그아웃</button>
          </>
        ) : (
          <>
            {/* 로그인 전 화면 */}
            <button className="login" onClick={openPopup}>로그인</button>
            <Link to="/signup" className='signup-button'><button className="signup">회원가입</button></Link>
            {isPopupOpen && <LoginPopup closePopup={closePopup} onLoginSuccess={handleLoginSuccess} />}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

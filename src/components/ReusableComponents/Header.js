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
  const [isTokenValid, setIsTokenValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 로드될 때 `localStorage`에서 토큰을 확인하여 로그인 상태를 결정합니다.
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);  // 한 번만 실행, 즉 페이지 렌더링 시

  const handleLinkClick = async () => {
    const token = localStorage.getItem('accessToken');

    try {
      const response = await axios.get('http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/notificationList', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setIsTokenValid(true); // 토큰이 유효하면 true로 설정
        console.log("콘솔로그:" + response.status);
        console.log(isTokenValid);
      } 
    } catch (error) {
      // 인증 오류 처리
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsTokenValid(false);
      } 
      // 서버 오류 시 refreshToken 재발급 시도
      else if (error.response && error.response.status === 500) {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const res = await axios.post('http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/auth/reissue', 
            { refreshToken: refreshToken },
            {
              headers: {
                'Content-Type': 'application/json'
              }
          });
          
          // 새로운 accessToken이 성공적으로 발급된 경우
          if (res.data && res.data.accessToken) {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            console.log("token 재발급 완료");
            setIsTokenValid(true); // 새 토큰 발급 후 유효한 것으로 설정
          } else {
            setIsTokenValid(false);
          }
        } catch {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setIsTokenValid(false);
        }
      }
    }
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

  const handleMypage = () => {
    handleLinkClick(); //accessToken만료확인 함수 호출
    if(isTokenValid){ //이후 isTokenValid가 true면 클락한 페이지로이동
      navigate('/mypage');
    } else { //아니면 못들어가게
      alert("로그인 후 이용해주세요.");
      navigate('/');
    }
  }

  const handleCommunity = () => {
    handleLinkClick(); //accessToken만료확인 함수 호출
    if(isTokenValid){ //이후 isTokenValid가 true면 클락한 페이지로이동
      navigate('/free');
    } else { //아니면 못들어가게
      alert("로그인 후 이용해주세요.");
      navigate('/');
    }
  }
  
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
          <li><Link onClick={handleCommunity}>커뮤니티</Link></li>
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
            onClick={handleMypage}
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

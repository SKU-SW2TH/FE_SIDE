import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../../styles/Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/headerlogo.png';
import LoginPopup from "../MyPage/LoginPopup";
import "../../styles/LoginPopup.css";
import profileImage from '../../assets/images/image.png';
import bell from '../../assets/images/bell.png';
import { useAuth } from './AuthContext';
import axios from 'axios';

function Header() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [image, setImage] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/info`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );
      const { profile, nickname, email } = response.data;
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('email', email);
      setImage(profile || profileImage); // 프로필 사진 업데이트
      console.log("프로필업데이드 status:" + response.status);
      setIsTokenValid(true);
    } catch (error) {
      if (error.response && error.response.status === 500) {
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
            return fetchProfile();
          } else {
            setIsTokenValid(false);
          }
        } catch {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setIsLoggedIn(false);
          setIsTokenValid(false);
        }
      } else {
        setIsTokenValid(false);
      }
    }
  };

  useEffect(() => {
      fetchProfile(); // 컴포넌트가 마운트될 때 프로필 정보 가져오기
  }, []);


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
      const response = await axios.get('http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/notification/unread', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setUnreadCount(response.data);
        console.log("unreadCount:" + unreadCount);
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
      } else {
        setIsTokenValid(false);
      }
    }
  };
  
  useEffect(() => {
    handleLinkClick();
  }, []);

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
          <li><Link to="/study">스터디</Link></li>
          <li><a href="#mentoring">멘토링</a></li>
          <li><Link to="/free">커뮤니티</Link></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            {/* 로그인 후 화면 */}
          <div className="profile-container">
          {image ? (
        <img
          src={image}
          alt="profile-image"
          className="header-profile-image"
          onClick={handleMypage}
        />
      ) :(
        <img
          src={profileImage}
          alt="profile-image"
          className="header-profile-image"
          onClick={handleMypage}
        /> 
        )}
        <span className="hover-text">마이페이지</span>
          </div>
          <div className="notification-container" style={{ position: 'relative' }}>
            <img
              src={bell}
              alt="bell"
              style={{
                marginLeft: '40px', 
                width: '23px', 
                height: '23px',
                verticalAlign: 'top',
                marginTop: '8px',
                opacity: '0.7',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/notification')}
            />
            {unreadCount > 0 && (
              <span className="notification-dot"></span>
            )}
            <span className="notification-hover-text">
              읽지 않은 알림이 {unreadCount}개 있습니다
            </span>
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

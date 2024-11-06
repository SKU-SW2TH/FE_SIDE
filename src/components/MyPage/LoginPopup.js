import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../../styles/LoginPopup.css'; // 팝업 스타일링을 위한 css 파일
import logo from '../../assets/images/headerlogo.png';
import eye from '../../assets/images/eye.png';
import closedeye from '../../assets/images/closedeye.png';
import axios from 'axios';

function LoginPopup({ closePopup, onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChangeId = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePw = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    try {
      const response = await axios.post('http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/auth/login', { email, password });
      console.log(response);

      if (response.status === 200) {
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken); // 로컬 스토리지에 토큰 저장
        console.log('로그인 성공, 토큰:', accessToken);

        if (onLoginSuccess) {
          onLoginSuccess(); // 부모 컴포넌트에서 받은 함수 호출
        }

        navigate('/'); // 홈 페이지로 리디렉션
        closePopup(); // 팝업 닫기
      } 
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('✗ 잘못된 이메일 또는 비밀번호입니다.');
        console.log('Error Message Updated: 잘못된 이메일 또는 비밀번호입니다.');

        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          // refresh token을 사용하여 새로운 access token을 요청하는 API 호출
          axios.post('http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/auth/reissue', { refreshToken })
            .then((res) => {
              const { newAccessToken } = res.data;
              localStorage.setItem('accessToken', newAccessToken);
              // 성공적으로 갱신 후, 이전 요청을 다시 시도할 수 있음
            })
            .catch((err) => {
              // refresh token도 만료된 경우, 로그인 페이지로 리다이렉트
              navigate('/');
            });
          }
      } else {
        console.error('로그인 오류:', error);
      }
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <img src={logo} alt="Logo" className='popup-logo'/>
        <button className="close-button" onClick={closePopup}>✕</button>
        <form onSubmit={onSubmit}> {/* 폼 추가 */}
          <div className="form-group">
            <input 
              type="email" 
              id="email-forlogin" 
              placeholder="이메일"
              onChange={handleChangeId} 
              value={email} 
              required 
            />
          </div>
          <div className="form-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              className="password-input"
              onChange={handleChangePw} 
              value={password}
              required 
            />
            <span className="toggle-password-forlogin" onClick={togglePasswordVisibility}>
              {showPassword ? <img src={closedeye} alt="closedeye" className='closedeye'/> : <img src={eye} alt="eye" className='eye'/>}
            </span>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>} {/* 에러 메시지 조건부 렌더링 */}
          <button type="submit" className="login-button">로그인</button>
        </form>
        <div className='signreset'>
          <Link className='find-bar' to={'/find-password'} onClick={closePopup}> 비밀번호 찾기 |</Link>
          <Link className='find-bar' to={'/signup'} onClick={closePopup}> 회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;

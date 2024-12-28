import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../../styles/LoginPopup.css';
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

  const handleErrorResponse = (status) => {
    switch(status) {
      case 401:
        setErrorMessage('✗ 잘못된 이메일 또는 비밀번호입니다.');
        break;
      case 403:
        setErrorMessage('✗ 비활성화된 계정입니다. 관리자에 문의하세요.');
        break;
      case 404:
        setErrorMessage('✗ 잘못된 이메일 또는 비밀번호입니다.');
        break;
      case 500:
        setErrorMessage('✗ 서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        break;
      default:
        setErrorMessage('✗ 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/auth/login', { email, password });
      console.log(response);

      if (response.status === 200) {
        const { accessToken }  = response.data;
        const { refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('email', email);
        console.log('로그인 성공, accessToken:', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('email', email);
        if (onLoginSuccess) {
          onLoginSuccess();
        }

        navigate('/');
        closePopup();
      } 
    } catch (error) {
      if (error.response) {
        handleErrorResponse(error.response.status);
      }
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <img src={logo} alt="Logo" className='popup-logo'/>
        <button className="close-button" onClick={closePopup}>✕</button>
        <form onSubmit={onSubmit}>
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
          {errorMessage && <div className="error-message">{errorMessage}</div>}
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

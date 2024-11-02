import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../../styles/LoginPopup.css'; // 팝업 스타일링을 위한 css 파일
import logo from '../../assets/images/headerlogo.png';
import eye from '../../assets/images/eye.png';
import closedeye from '../../assets/images/closedeye.png';

function LoginPopup({ closePopup }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
  };
 
  return (
    <div className="popup-overlay">
      <div className="popup">
        <img src={logo} alt="Logo" className='popup-logo'/>
        <button className="close-button" onClick={closePopup}>✕</button>
        
        {/* 로그인 폼 */}
        <form>
          <div className="form-group">
            <input type="email" id="email-forlogin" placeholder="이메일" />
          </div>
          <div className="form-group">
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호"
                className="password-input"
            />
            <span className="toggle-password-forlogin" onClick={togglePasswordVisibility}>
                {showPassword ? <img src={closedeye} alt="closedeye" className='closedeye'/> : <img src={eye} alt="eye" className='eye'/>}
            </span>
          </div>
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

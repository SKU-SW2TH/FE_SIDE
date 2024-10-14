import { Link } from 'react-router-dom';
import React from 'react';
import '../styles/LoginPopup.css'; // 팝업 스타일링을 위한 css 파일

function LoginPopup({ closePopup }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <img className="logo" src='img/inflearn.png'/>
        <button className="close-button" onClick={closePopup}>✕</button>
        
        {/* 로그인 폼 */}
        <form>
          <div className="form-group">
            <input type="email" id="email" placeholder="이메일 입력" />
          </div>
          <div className="form-group">
            <input type="password" id="password" placeholder="비밀번호 입력" />
          </div>
          <button type="submit" className="submit-button">로그인</button>
        </form>
        <Link className='find-bar' to={'/find-email'} onClick={closePopup}>아이디(이메일) 찾기 |</Link>
        <Link className='find-bar' to={'/find-password'} onClick={closePopup}> 비밀번호 찾기 |</Link>
        <Link className='find-bar' to={'/signup'} onClick={closePopup}> 회원가입</Link>
      </div>
    </div>
  );
}

export default LoginPopup;

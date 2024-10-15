import React from 'react';
import '../../styles/Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/headerlogo.png';

function Header() {
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
          <li><a href="#community">커뮤니티</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="login">로그인</button>
        <button className="signup">회원가입</button>
      </div>
    </header>
  );
}

export default Header;

// Footer.js
import React from 'react';
import '../../styles/Footer.css';
import logo from '../../assets/images/footerlogo.png'

function Footer() {
  return (
    <div className="App-footer">
      <div className="footer-bottom">
        <img
          src={logo}
          alt="Logo 이미지"
          className="logo-image"
        />
        <p>Copyright © 2024 Nexcent Inc.<br />
          All rights reserved.</p>
        <div className="social-icons">
          <a href="#">페이스북</a>
          <a href="#">트위터</a>
          <a href="#">유튜브</a>
        </div>
      </div>
      <div className="footer-links">
        <div className="company">
          <h3>회사</h3>
          <ul>
            <li><a href="#">회사 소개</a></li>
            <li><a href="#">서비스</a></li>
            <li><a href="#">블로그</a></li>
            <li><a href="#">채용</a></li>
          </ul>
        </div>
        <div className="support">
          <h3>지원</h3>
          <ul>
            <li><a href="#">자주 묻는 질문</a></li>
            <li><a href="#">고객 지원</a></li>
            <li><a href="#">연락하기</a></li>
          </ul>
        </div>
        <div className="newsletter">
          <h3>뉴스 구독하기</h3>
          <select>
            <option value="">이메일 주소 입력</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Footer;

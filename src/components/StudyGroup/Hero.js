// Hero.js
import React from 'react';
import '../../styles/Hero.css';
import heroimage from '../../assets/images/heroimage.png';

function Hero() {
  return (
    <section className="hero">
      <div className='hero-content'>
        <div className='text-content' style={{ textAlign: 'left' }}>
          <h1><span style={{ color: '#4caf4f' }}>Nexcents</span>에서 <span style={{ color: '#4caf4f' }}>성장</span>을<br />
            도와드려요</h1>
          <p>스터디, 멘토링, 커뮤니티를 통해 함께 성장하는 경험을 제공합니다</p>
          <button className="cta-button">시작하기</button>
        </div>
        <img
          src={heroimage}
          alt="배너 이미지"
          className="hero-image"
        />
      </div>
    </section>
  );
}

export default Hero;

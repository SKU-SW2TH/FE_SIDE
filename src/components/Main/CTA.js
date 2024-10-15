// CTA.js
import React from 'react';
import '../../styles/CTA.css';

function CTA({ title, buttonText, buttonLink }) {
  return (
    <section className="cta-section">
      <h1 className="title">IT 전문가로 성장할<br />
            준비가 되셨나요?</h1>
          <button className="cta-button">시작하기 →</button>
    </section>
  );
}

export default CTA;

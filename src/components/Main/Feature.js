// Feature.js
import React from 'react';
import '../../styles/Feature.css';

function Feature({ image, title, description }) {
  return (
    <div className="feature">
      <img src={image} alt="feature 이미지" className="feature-image" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default Feature;

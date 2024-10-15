import React from 'react';
import '../../styles/FAQ.css';
import FAQimage from '../../assets/images/FAQ.png';

function FAQ() {
  return (
    <div className="FAQ">
      <img
        src={FAQimage}
        alt="FAQ 이미지"
        className="faq-image"
      />
    </div>
  );
}

export default FAQ;

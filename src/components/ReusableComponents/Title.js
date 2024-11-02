import React from 'react';
import '../../styles/Board.css';

function Title({ title }) {
  // 화면에 표시될 최대 길이
  const maxLength = 20;

  // 제목이 최대 길이를 넘을 경우 잘라서 표시
  const displayTitle = title.length > maxLength
    ? `${title.substring(0, maxLength)}...`
    : title;

  return (
    <h3 className='title-content-text'>{displayTitle}</h3>
  );
}

export default Title;

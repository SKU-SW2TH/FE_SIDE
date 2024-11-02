import React from 'react';
import '../../styles/Board.css';

function Content({ content }) {
  // 화면에 표시될 최대 길이
  const maxLength = 110;

  // 제목이 최대 길이를 넘을 경우 잘라서 표시
  const displayContent = content.length > maxLength
    ? `${content.substring(0, maxLength)}...`
    : content;

  return (
    <h3 className='content-text'>{displayContent}</h3>
  );
}

export default Content;

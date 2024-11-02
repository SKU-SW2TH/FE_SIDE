// src/components/Board.js
import React from 'react';
import { Link } from 'react-router-dom'; // Link 추가
import Title from '../ReusableComponents/Title';
import Content from '../ReusableComponents/Content';
import '../../styles/Board.css';

function Board({ posts, currentPage, postsPerPage, handlePageChange }) {
  // 각 페이지에 표시할 게시글 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 페이지 번호 범위 설정
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4); 
  const displayedPageNumbers = pageNumbers.slice(startPage - 1, endPage);

  return (
    <div>
      {currentPosts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <ul className="post-list">
          {currentPosts.map((post) => (
            <li key={post.id} className='post-container'>
              {/* 게시글 제목을 클릭 시 상세 페이지로 이동 */}
              <Link to={`/post/${post.id}`}>
                <Title title={post.title} />
              </Link>
              <Content content={post.content} />
              <div className='discript'>
                <span className='name-time'>
                  {post.name} {post.time}
                </span>
                <span className='like-view-reply'>
                  <span className='like'>♡{post.like}</span>
                  <span className='view'>⦿{post.view}</span>
                  <span className='reply'>💬{post.reply}</span>
                </span>
              </div>
              <hr className='hr-length'/>
            </li>
          ))}
        </ul>
      )}
      
      {/* 페이지네이션 */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button>

        {displayedPageNumbers.map(number => (
          <button 
            key={number} 
            onClick={() => handlePageChange(number)} 
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
}

export default Board;

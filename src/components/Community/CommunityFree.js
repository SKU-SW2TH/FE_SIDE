import React, { useState } from 'react';
import "../../styles/Community.css";
import CommunitySideNav from "./CommunitySideNav";
import { Link } from 'react-router-dom';
import Board from './Board';
import PostForm from './PostForm'; 

const CommunityFree = () => {
  const [posts, setPosts] = useState([]);  // 게시글 데이터
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 번호
  const postsPerPage = 2;  // 한 페이지에 보여줄 게시글 수

  // 게시글 추가 함수
  const addPost = (postData) => {
    const newPost = { id: Date.now(), ...postData }; // 게시글에 ID 추가
    setPosts([newPost, ...posts]); // 새로운 게시글 추가
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='container'>
      <CommunitySideNav/>
      <div>
        <p className='community-title'>자유 게시판</p>
        <div className='community-input'>
          <input id='community-input' placeholder='궁금한 내용을 검색해 보세요!' />
          <button className='community-search-button'>검색</button>
        </div>
        <div className='community-select'>
          <Link to="/free" id='select'>ㆍ최신순</Link>
          <Link to="/free" id='select'>ㆍ좋아요순</Link>
          <Link to="/free" id='select'>ㆍ댓글많은순</Link>
          <Link to="/free/post-form">
            <button className='write-button'>✎ 글쓰기</button>
          </Link>
        </div>
        <div className="App">
          <PostForm addPost={addPost} />  {/* 게시글 추가 폼 */}
          <Board
            posts={posts} // 게시글 목록 전달
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityFree; 
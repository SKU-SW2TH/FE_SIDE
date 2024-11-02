import React, {useState} from 'react';
import "../../styles/Community.css";
import CommunitySideNav from "./CommunitySideNav";
import { Link } from 'react-router-dom';

const CommunityQuestion = () => {
  return (
    <div className='container'>
      <CommunitySideNav userName="박범준" profileImage="img/image.png" />
      <div>
        <p className='community-title'>질문 게시판</p>
        <div className='community-input'><input id='community-input' placeholder='궁금한 질문을 검색해 보세요!'/><button className='community-search-button'>검색</button></div>
        <div className='community-select'>
          <Link to="/free" id='select'>ㆍ최신순</Link>
          <Link to="/free" id='select'>ㆍ좋아요순</Link>
          <Link to="/free" id='select'>ㆍ댓글많은순</Link>
          <Link to="/question/post-form"><button className='write-button'>✎ 글쓰기</button></Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityQuestion;

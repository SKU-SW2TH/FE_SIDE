import React from 'react';
import "../../styles/Community.css";
import CommunitySideNav from "./CommunitySideNav";

const CommunityFree = () => {
  return (
    <div className='container'>
      <CommunitySideNav userName="박범준" profileImage="img/image.png" />
      <div>
        <p className='community-title'>자유 게시판</p>
        <div className='community-input'><input id='community-input' placeholder='궁금한 질문을 검색해 보세요!'/><button className='community-search-button'>검색</button></div>
        <div>
          <select className='community-select'>
            <option value="option1">조회수순</option>
            <option value="option2">추천순</option>
            <option value="option3">최신순</option>
          </select>
          <button className='write-button'>글쓰기</button>
        </div>
        <div className='title-info'>
          <span>번호</span>
          <span className='title-info-sub'>
            <span>글쓴이</span>
            <span className='sub'>작성일</span>
            <span className='sub'>조회수</span>
            <span className='sub'>추천수</span>
            <span className='sub'>댓글수</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommunityFree;

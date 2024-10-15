import React from 'react';
import "../../styles/Community.css";
import CommunitySideNav from "./CommunitySideNav";

const CommunityQuestion = () => {
  return (
    <div className='container'>
      <CommunitySideNav userName="박범준" profileImage="img/image.png" />
      <div>
        <p className='community-title'>질문 게시판</p>
      </div>
    </div>
  );
};

export default CommunityQuestion;

import React from 'react';
import "../../styles/Community.css";
import CommunitySideNav from "./CommunitySideNav";

const CommunityGathering = () => {
  return (
    <div className='container'>
      <CommunitySideNav userName="박범준" profileImage="img/image.png" />
      <div>
        <p className='community-title'>모집 게시판</p>
      </div>
    </div>
  );
};

export default CommunityGathering;

// PopularPosts.js
import React, { useState, useEffect } from 'react';
import '../../styles/PopularPosts.css';

const samplePosts = [
  { id: 1, title: "이 죄수는 무료로 복역합니다.", comments: 36, time: "12시간 전", author: "김" },
  { id: 2, title: "(만화) 아리가 당신에게 하는 말", comments: 104, time: "16시간 전", author: "양양양양" },
  { id: 3, title: "성 정체성 쉽게 구분하는 법", comments: 79, time: "17시간 전", author: "unknown" },
  { id: 4, title: "파이리를 잘 모르는 트레이너", comments: 24, time: "17시간 전", author: "C28" },
  { id: 5, title: "우리 학교 미친거냐", comments: 23, time: "16시간 전", author: "파우스트는신이야수배해야해" },
];

function PopularPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(samplePosts);
  }, []);

  return (
    <div className="popular-posts-container">
      <h2>Nexcent 인기글</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <div className="rank">{post.id}</div>
            <div className="post-details">
              <a href="#" className="title">{post.title}</a>
              <span className="comments">[{post.comments}]</span>
            </div>
            <div className="post-meta">
              <span>{post.time}</span>
              <span>{post.author}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularPosts;

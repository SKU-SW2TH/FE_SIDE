import React, { useState } from 'react';

function PostForm({ addPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [like, setLike] = useState(0); // 초기값 0
  const [view, setView] = useState(0); // 초기값 0
  const [reply, setReply] = useState(0); // 초기값 0
  const [time, setTime] = useState(new Date().toLocaleString()); // 현재 시각

  const handleSubmit = (e) => {
    e.preventDefault();  // 페이지 리로드 방지
    if (title && content && name) {
      // 게시글 데이터를 addPost로 전달
      addPost({ title, content, name, time, like, view, reply });
      
      // 입력 필드 초기화
      setTitle('');
      setContent('');
      setName('');
      setLike(0);
      setView(0);
      setReply(0);
      setTime(new Date().toLocaleString()); // 새로운 현재 시각 설정
    } else {
      alert('제목, 내용, 이름을 입력해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="좋아요 수"
          value={like}
          onChange={(e) => setLike(Number(e.target.value))}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="조회수"
          value={view}
          onChange={(e) => setView(Number(e.target.value))}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="답글 수"
          value={reply}
          onChange={(e) => setReply(Number(e.target.value))}
        />
      </div>
      <div>
        <input
          type="text"
          value={time}
          readOnly
        />
      </div>
      <button type="submit">작성</button>
    </form>
  );
}

export default PostForm;
import React, { useState } from 'react';
import CommunitySideNav from './CommunitySideNav';
import '../../styles/FreePostForm.css'; // 스타일 파일

function QuestionPostForm({ addPost }) {
  const [title, setTitle] = useState(''); // 제목 상태
  const [content, setContent] = useState(''); // 내용 상태

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      addPost({ title, content }); // 부모 컴포넌트로 데이터 전달
      setTitle(''); // 입력 필드 초기화
      setContent('');
    } else {
      alert('제목과 내용을 입력하세요.');
    }
  };

  return (
    <div className='container'>
      <CommunitySideNav userName="박범준" profileImage="img/image.png" />
    <div className="post-form-container">
      <p className='free-post-title'>질문 게시글 작성</p>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            required
          />
        </div>
        <div>
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            required
          />
        </div>
        <button type="submit" className="submit-button">게시글 작성</button>
      </form>
    </div>
    </div>
  );
}

export default QuestionPostForm;

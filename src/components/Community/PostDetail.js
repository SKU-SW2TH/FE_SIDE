import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommunitySideNav from './CommunitySideNav'; // 사이드 네비게이션 컴포넌트
import CommentList from './CommentList'; // 댓글 리스트 컴포넌트
import '../../styles/Board.css';

function PostDetail() {
  const { postId } = useParams();
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '작성자 A',
      text: '첫 번째 댓글입니다.',
      time: new Date().toISOString(),
      likes: 0,
      replies: [],
    },
    // 다른 댓글 추가
  ]);

  const [author, setAuthor] = useState(''); // 작성자 입력
  const [commentText, setCommentText] = useState(''); // 댓글 입력

  // 게시글 정보
  const posts = [
    {
      id: 1730035345859,
      title: '첫 번째 게시글 제목',
      content: '여기는 첫 번째 게시글 내용입니다.',
      name: '작성자 A',
      time: new Date().toLocaleString(),
      view: 100,
    },
    {
      id: 2,
      title: '두 번째 게시글 제목',
      content: '여기는 두 번째 게시글 내용입니다.',
      name: '작성자 B',
      time: '2024-10-02',
      view: 200,
    },
  ];

  const post = posts.find(p => p.id === parseInt(postId)); // 해당 ID의 게시글 찾기

  if (!post) {
    return (
      <div className='container'>
        <CommunitySideNav />
        <div>
          <p className='post-none'>해당 게시글을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const addComment = () => {
    if (author.trim() === '' || commentText.trim() === '') return; // 빈 입력 방지

    const newComment = {
      id: Date.now(),
      author,
      text: commentText,
      time: new Date().toISOString(),
      likes: 0,
      replies: [],
    };
    setComments([...comments, newComment]);
    setAuthor(''); // 입력 초기화
    setCommentText(''); // 입력 초기화
  };

  const cancelComment = () => {
    setAuthor(''); // 작성자 입력 초기화
    setCommentText(''); // 댓글 입력 초기화
  };

  const deleteComment = (updatedComments) => {
    setComments(updatedComments);
  };

  const editComment = (updatedComments) => {
    setComments(updatedComments);
  };

  return (
    <div className='container'>
      <CommunitySideNav />
      <main style={{ marginLeft: '20px' }}>
        <div className='freecommunity-title'>
          {post.title}
        </div>
        <div className='writer'>
          <span id='post-name'>{post.name}</span>
        </div>
        <div className='write-info'>
          <span className='write-time'> 작성일 {post.time}</span> |
          <span className='view-record'> 조회수 {post.view}</span>
          <span className='heart'><button className='heart-button'>♡</button></span>
        </div>
        <hr className='hr-for-post' />
        <p className='content-free'>{post.content}</p>
        <hr className='hr-for-reply' />
        
        {/* 댓글 작성 영역 */}
        <div className="comment-input-container">
        <h3>댓글</h3>
          <input
            type="text"
            placeholder="작성자 이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="comment-input author-input"
          />
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="comment-input text-input"
          />
          <div className='comment-input-button'>
            <button className="comment-button" onClick={addComment}>댓글 추가</button>
            <button className="cancel-button" onClick={cancelComment}>취소</button>
            </div>
        </div>

        <CommentList
          comments={comments}
          deleteComment={deleteComment}
          editComment={editComment}
        />
      </main>
    </div>
  );
}

export default PostDetail;

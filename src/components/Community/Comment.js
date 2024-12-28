import React, { useState } from 'react';

const Comment = ({ comment, onReply, onDelete, onEdit }) => {
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [hasLiked, setHasLiked] = useState(false); // 좋아요 상태 관리

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleAddReply = () => {
    if (replyText.trim() !== '') {
      onReply(comment.id, replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  const handleDeleteClick = () => {
    onDelete(comment.id);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSubmit = () => {
    if (editedText.trim() !== '') {
      onEdit(comment.id, editedText);
      toggleEdit();
    }
  };

  const handleLikeClick = () => {
    if (!hasLiked) {
      setHasLiked(true);
      comment.likes += 1; // 좋아요 수 증가
    }
  };

  return (
    <div className="comment-container">
      <p>
        <strong>{comment.author}</strong> - {new Date(comment.time).toLocaleString()}
      </p>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="reply-input"
          />
          <button className="comment-button" onClick={handleEditSubmit}>수정 완료</button>
          <button className="comment-button" onClick={toggleEdit}>취소</button>
        </div>
      ) : (
        <p>{comment.text}</p>
      )}
      <button className="comment-button" onClick={handleLikeClick}>
        ♡ {hasLiked ? comment.likes : comment.likes}
      </button>
      <button className="comment-button" onClick={handleReplyClick}>대댓글 달기</button>
      <button className="comment-button" onClick={toggleEdit}>수정</button>
      <button className="comment-button" onClick={handleDeleteClick}>삭제</button>

      {showReplyInput && (
        <div>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="대댓글을 입력하세요"
            className="reply-input"
          />
          <button className="comment-button" onClick={handleAddReply}>대댓글 추가</button>
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="reply-container">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;

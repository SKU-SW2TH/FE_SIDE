import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, deleteComment, editComment }) => {
  const handleReply = (parentId, replyText) => {
    const parentComment = comments.find(comment => comment.id === parentId);
    const newReply = {
      id: Date.now(),
      author: '익명',
      text: replyText,
      time: new Date().toISOString(),
      likes: 0,
      replies: [],
    };
    if (parentComment) {
      parentComment.replies.push(newReply);
      deleteComment([...comments]); // 댓글 리스트 업데이트
    }
  };

  const handleDelete = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    comments.forEach(comment => {
      comment.replies = comment.replies.filter(reply => reply.id !== id);
    });
    deleteComment(updatedComments);
  };

  const handleEdit = (id, updatedText) => {
    const commentToEdit = comments.find(comment => comment.id === id);
    if (commentToEdit) {
      commentToEdit.text = updatedText;
      editComment([...comments]); // 댓글 리스트 업데이트
    } else {
      console.error("댓글을 찾을 수 없습니다:", id);
    }
  };

  return (
    <div>
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;

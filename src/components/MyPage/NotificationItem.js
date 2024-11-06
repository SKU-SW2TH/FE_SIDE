import React from 'react';
import styled from 'styled-components';

// 알림 아이템 스타일 정의
const NotificationItemContainer = styled.div`
    border: 1px solid #ddd;
    padding: 10px;
    width: 1000px;
    height: 50px;
    margin-top: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
`;

// 알림 아이템 컴포넌트
function NotificationItem({ notification }) {
  // 알림 유형에 따라 내용을 다르게 출력
  switch (notification.type) {
    case 'comment-reply':
      return (
        <NotificationItemContainer>
          {notification.name}님이 나의 댓글에 대댓글을 달았습니다.  <span>{notification.date}</span>
        </NotificationItemContainer>
      );
    case 'comment-like':
      return (
        <NotificationItemContainer>
          {notification.name}님이 나의 댓글에 좋아요를 눌렀습니다.  <span>{notification.date}</span>
        </NotificationItemContainer>
      );
    case 'article-reply':
      return (
        <NotificationItemContainer>
          {notification.name}님이 나의 게시글에 댓글을 달았습니다.  <span>{notification.date}</span>
        </NotificationItemContainer>
      );
    case 'article-like':
      return (
        <NotificationItemContainer>
          {notification.name}님이 나의 게시글에 좋아요를 눌렀습니다.    <span>{notification.date}</span>
        </NotificationItemContainer>
      );
  }
}

export default NotificationItem;

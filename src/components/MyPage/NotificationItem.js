import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotificationItemContainer = styled.div`
    border: 1px solid #ddd;
    padding: 10px;
    width: 1000px;
    height: 50px;
    margin-top: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.$unread ? '#f5f5f5' : 'white'};
    font-weight: ${props => props.$unread ? 'bold' : 'normal'};
`;

function NotificationItem({ notification, isUnread }) {
    const getTimeAgo = (createdAt) => {
        const now = new Date();
        const created = new Date(createdAt);
        const diffTime = Math.abs(now - created);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));

        if (diffDays > 0) {
            return `${diffDays}일 전`;
        } else if (diffHours > 0) {
            return `${diffHours}시간 전`;
        } else if (diffMinutes > 0) {
            return `${diffMinutes}분 전`;
        } else {
            return '방금 전';
        }
    };

    return (
        <NotificationItemContainer $unread={isUnread}>
            <Link to={`/post/${notification.targetId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {notification.content}
            </Link>
            <span>{getTimeAgo(notification.createdAt)}</span>
        </NotificationItemContainer>
    );
}

export default NotificationItem;

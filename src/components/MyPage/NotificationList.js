import React from 'react';
import NotificationItem from './NotificationItem';

function NotificationList({ notifications, unreadCount }) {
    return (
        <div>
            {notifications.map((notification, index) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    isUnread={index < unreadCount} // unreadCount만큼 읽지 않은 상태 처리
                />
            ))}
        </div>
    );
}

export default NotificationList;

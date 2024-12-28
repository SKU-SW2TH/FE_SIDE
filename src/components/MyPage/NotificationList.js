import React from 'react';
import NotificationItem from './NotificationItem'; // 위에서 만든 컴포넌트

function NotificationList({ notifications, totalElements, unreadCount }) {
  return (
    <div>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} totalElements={totalElements} unreadCount={unreadCount} />
      ))}
    </div>
  );
}

export default NotificationList;

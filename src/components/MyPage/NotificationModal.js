// components/NotificationModal.js
import React, { useEffect } from 'react';
import "../../styles/NotificationModal.css";

function NotificationModal({ message, onClose }) {
    useEffect(() => {
        // 3초 후에 자동으로 모달 닫기
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    useEffect(() => {
        console.log('NotificationModal의 message 값:', message);
    }, [message]);
    
    if (!message) return null;

    return (
        <div className="notification-modal">
            <div className="modal-content">
                <p>{message}</p>
            </div>
        </div>
    );
}

export default NotificationModal;

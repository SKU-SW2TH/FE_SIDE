// Notification.js
import React, { useEffect, useState } from 'react';
import NotificationList from './NotificationList';
import styled from 'styled-components';
import MyPageSideNav from './MyPageSideNav'; // MyPageSideNav import
import neko from '../../assets/images/neko.png';

const PageContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 7fr;
    gap: 100px;
`;

const PageLabel = styled.label`
    text-align: left;
    margin-bottom: 20px; /* 각 행 사이의 간격 */
`;

const MainTitle = styled.p`
    margin-top: 30px;
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 20px;
`;

const ImageSpan = styled.span`
display: flex;
justify-content: center;
`;

const TextSpan = styled.span`
display: flex;
justify-content: center;
margin-right:30px;
font-size:20px;
`;


const TextSpanSub = styled.span`
display: flex;
justify-content: center;
margin-right:30px;
font-size: 15px;
color: #999;
`;

function Interest() {
    // const [notifications, setNotifications] = useState([]);

    // useEffect(() => {
    //     // 예시 API 호출 (실제 URL로 변경)
    //     fetch('https://api.example.com/notifications')
    //     .then((response) => response.json())
    //     .then((data) => setNotifications(data))
    //     .catch((error) => console.error('Error fetching notifications:', error));
    // }, []);

    const [notifications, setNotifications] = useState([
        { id: 1, type: 'comment-reply', name: 'ggdaero99', date: '1일전' },
        { id: 2, type: 'comment-like', name: 'ggdaero99', date: '1일전' },
        { id: 3, type: 'article-reply', name: 'ggdaero99', date: '3일전' },
        { id: 4, type: 'article-like', name: 'ggdaero99', date: '2일전' },
    ]);

    return (
        <PageContainer>
            <MyPageSideNav />
            <div>
                <PageLabel>
                    <MainTitle>알림</MainTitle>
                </PageLabel>
                {notifications.length > 0 ? (
                        <NotificationList notifications={notifications} />
                    ) : (
                        <>
                            <ImageSpan><img src={neko} alt="neko" /></ImageSpan>
                        <TextSpan><p>알림이 없습니다.</p></TextSpan>
                        <TextSpanSub><p>알림설정을 통해 알림을 받을 수 있어요.</p></TextSpanSub>
                        </>
                )}
            </div>
        </PageContainer>
    );
}

export default Interest;

// Notification.js
import React, { useState, useEffect } from 'react';
import NotificationList from './NotificationList';
import styled from 'styled-components';
import MyPageSideNav from './MyPageSideNav'; // MyPageSideNav import
import neko from '../../assets/images/neko.png';
import axios from 'axios';
import { Pagination } from '@mui/material';

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

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

function Notification() {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [unreadCount, setUnreadCount] = useState(0);

    // 알림 읽음 처리 API 함수 추가
    const markNotificationsAsRead = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.patch(
                'http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/update/notification/read',
                {}, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            // 성공 메시지 콘솔에 출력
            console.log('알림 읽음 처리가 완료되었습니다.');
            
            setTimeout(() => {
                fetchUnreadCount();
            }, 1000);
        } catch (error) {
            console.error('알림 읽음 처리 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get('http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/notificationList',
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        },
                        params: {
                            page: currentPage,
                            size: 10,
                            sort: 'createdAt'
                        }
                    }
                );

                if (response.status === 200) {
                    const { totalElements, totalPages, content } = response.data;
                    setNotifications(content);
                    setTotalPages(totalPages);
                    setTotalElements(totalElements);
                }
            } catch (error) {
                console.error('알림을 불러오는데 실패했습니다:', error);
            }
        };

        fetchNotifications();
        // 컴포넌트가 마운트된 후 1초 뒤에 읽음 처리
        const timer = setTimeout(() => {
            markNotificationsAsRead();
        }, 1000);

        return () => clearTimeout(timer);
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1);
    };

    const fetchUnreadCount = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.get('http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/notification/unread', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.status === 200) {
                setUnreadCount(response.data);
            }
        } catch (error) {
            console.error('읽지 않은 알림 수 확인 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        fetchUnreadCount();
    }, []);

    return (
        <PageContainer>
            <MyPageSideNav />
            <div>
                <PageLabel>
                    <MainTitle>알림</MainTitle>
                </PageLabel>
                {totalElements > 0 ? (
                    <>
                        <NotificationList 
                            notifications={notifications} 
                            totalElements={totalElements} 
                            unreadCount={unreadCount}
                        />
                        <PaginationContainer>
                            <Pagination 
                                count={totalPages} 
                                page={currentPage + 1} 
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </PaginationContainer>
                    </>
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

export default Notification;

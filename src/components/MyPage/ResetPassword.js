import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import NotificationModal from './NotificationModal';

function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [notification, setNotification] = useState('');  // 알림 메시지 상태

    const navigate = useNavigate();

    useEffect(() => {
        // localStorage에서 resetToken 가져오기
        const resetToken = localStorage.getItem('resetToken');
        
        // resetToken이 없으면 유효하지 않은 페이지로 리다이렉트
        if (!resetToken) {
            showNotification("비밀번호 재설정 메일을 받아서 처리해 주시기 바랍니다.");
            navigate('/');
            return;
        }

        // 서버에 resetToken 유효성 검사 요청
        validateResetToken(resetToken);
    }, []);

    const showNotification = (message) => {
        console.log('알림 메시지:', message);  // 메시지 확인
        setNotification(message);
    };

    useEffect(() => {
        console.log('notification 값 변경됨:', notification);
    }, [notification]);    

    useEffect(() => {
        // 비밀번호 실시간 확인
        if (confirmPassword && newPassword !== confirmPassword) {
            setErrorMessage('✗ 비밀번호가 일치하지 않습니다.');
        } else {
            setErrorMessage('');
        }
    }, [newPassword, confirmPassword]);

    const inputStyle = {
        border: errorMessage ? '2px solid red' : '1px solid #ccc',
    };

    const validateResetToken = async (resetToken) => {
        try {
            // 서버에 resetToken 유효성 검사를 GET 방식으로 요청
            const response = await axios.get(
                `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/auth/valid-reset-token`,
                {
                    headers: { 
                        'Authorization': `Bearer ${resetToken}`,
                        'Content-Type': 'application/json' 
                    }
                }
            );

            if (response.status === 200) {
                console.log(response.status);
            } else {
                showNotification("오류가 발생했습니다.");
                console.log(response.status);
                navigate('/');
            }
        } catch (error) {
            showNotification("오류가 발생했습니다.");
            navigate('/');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // localStorage에서 resetToken 가져오기
        const resetToken = localStorage.getItem('resetToken');
        
        if (!resetToken) {
            setErrorMessage('✗ 유효한 링크가 아닙니다.');
            navigate('/');
            return;
        }

        // 유효한 토큰과 새 비밀번호로 비밀번호 변경 요청
        try {
            const response = await axios.patch(
                'http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/auth/change-password',
                newPassword, // 새 비밀번호를 순수 텍스트로 본문에 전달
                {
                    headers: {
                        'Content-Type': 'text/plain',
                        'Authorization': `Bearer ${resetToken}`  // resetToken을 Authorization 헤더로 전달
                    }
                }
            );

            if (response.status === 200) {
                showNotification('비밀번호가 성공적으로 변경되었습니다.');
                localStorage.removeItem('resetToken');  // 토큰 삭제
                console.log(notification);
                console.log(response.status);
                navigate('/');
            }
        } catch (error) {
            if(error.response.status === 400) {
                setErrorMessage("✗ 변경하시려는 비밀번호가 기존 비밀번호와 같습니다.");
            } else if (error.response.status === 401) {
                setErrorMessage('✗ 비밀번호 변경 중 오류가 발생했습니다.');
            } else {
                setErrorMessage('✗ 비밀번호 변경 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="reset-password-container">
            <div className='reset-password-title'>
                <h1 className='reset-password-title-p'>비밀번호 재설정</h1>
            </div>
            <div className='reset-password-subtitle'>
                <p className='reset-info'>새로 사용할 비밀번호를 설정해주세요.</p>
            </div>
                <form onSubmit={handleSubmit}>
                <div className='find-sumit-form'>
                    <div className='newpwd-form'>
                        <label htmlFor="newPassword">새 비밀번호</label>
                    </div>
                    <div className="reset-form">
                        <input
                        type="password"
                        id="code" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        />
                    </div>
                </div>
                <div>
                    <div className='confirm-form'>
                        <label htmlFor="confirmPassword">비밀번호 확인</label>
                    </div>
                    <div className="reset-form">
                        <input
                            type="password"
                            id="code" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>
                </div>
                <div className='reset-error'>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
                <div className='resetpwd-button-form'>
                    <button id="resetbutton" type="submit">비밀번호 재설정</button>
                </div>
            </form>
            {notification && <NotificationModal message={notification} onClose={() => setNotification('')} />}
    </div>
);
}

export default ResetPasswordPage;

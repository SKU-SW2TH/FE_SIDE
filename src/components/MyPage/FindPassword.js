import React, { useState } from "react";
import "../../styles/FindPage.css";
import axios from 'axios';

function FindPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");  // 성공 메시지
    const [errorMessage, setErrorMessage] = useState("");  // 오류 메시지

    const handleFindPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/auth/send-reset-token",
                email,
                {
                    headers: {
                        "Content-Type": "text/plain"  // 순수 텍스트로 전송
                    }
                }
            );

            if (response.status === 200) {
                // 성공한 경우, 성공 메시지만 표시
                setMessage("✓ 비밀번호 재설정 링크가 이메일로 전송되었습니다.");
                setErrorMessage("");  // 오류 메시지는 비워둠
                console.log(response.status);

                // response.data가 JWT 토큰이면 바로 localStorage에 저장
                const resetToken = response.data;  // response.data는 JWT 토큰
                localStorage.setItem('resetToken', resetToken);
                console.log(resetToken);
            }
        } catch (error) {
            // 오류가 발생한 경우, 오류 메시지만 표시
            if (error.response && error.response.status === 404) {
                setErrorMessage("✗ 입력하신 이메일을 찾을 수 없습니다.");
                setMessage("");  // 성공 메시지는 비워둠
            } else {
                setErrorMessage("✗ 오류가 발생했습니다. 다시 시도해 주세요.");
                setMessage("");  // 성공 메시지는 비워둠
            }
        }
    };

    return (
        <div className='find-container'>
            <h1 className="find-password-title">비밀번호 찾기</h1>
            <p className="subText">가입한 이메일을 입력해 주세요. 이메일을 통해 비밀번호 변경 링크가 전송됩니다.</p>

            <div className="find-password-subtitle-form02">
                <p className="find-password-email">이메일</p>
                <div className="find-submit-form">
                    <input 
                        type="text" 
                        id="code" 
                        placeholder="이메일" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {message && <p className="find-password-success-message">{message}</p>}
                {errorMessage && <p className="find-password-error-message">{errorMessage}</p>}
            </div>
            <div>
                <button id="confirm" onClick={handleFindPassword}>비밀번호 찾기</button>
            </div>
            
        </div>
    );
}

export default FindPassword;

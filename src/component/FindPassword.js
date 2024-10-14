import React from "react";
import "../styles/FindPage.css"

function FindPassword() {
    return(
    <div className='find-container'>
        <h1>비밀번호 찾기</h1>
        <p className="subText">가입한 이메일을 입력해 주세요.이메일을 통해 비밀번호 변경 링크가 전송됩니다</p>

        <div className="find-password-subtitle-form">
            <p className="find-password-name">이름</p>
            <div className="find-submit-form">
                <input type="text" id="phone" placeholder="이름 입력" />
            </div>
            
            <p className="find-password-email">이메일</p>
            <div className="find-submit-form">
                <input type="text" id="code" placeholder="이메일 입력" />
            </div>
            <button id="confirm">확인</button>
        </div>
    </div>
    );
}

export default FindPassword;
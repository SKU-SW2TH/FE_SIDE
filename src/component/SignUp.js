import React from "react";
import "./FindPage.css"

function SignUp() {
    return(
    <div className='find-container'>
        <h1>회원가입</h1>
        <div className="find-password-subtitle-form">
            <p className="find-password-name">이메일</p>
            <div className="find-submit-form">
                <input type="text" id="phone" placeholder="example@naver.com" />
            </div>
            
            <p className="find-password-email">비밀번호</p>
            <div className="find-submit-form">
                <input type="text" id="code" placeholder="********" />
            </div>

            <p className="find-password-email">비밀번호 확인</p>
            <div className="find-submit-form">
                <input type="text" id="code" placeholder="********" />
            </div>
            <button id="confirm">가입하기</button>
        </div>
    </div>
    );
}

export default SignUp;
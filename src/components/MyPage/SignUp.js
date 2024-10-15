import React from "react";
import "../../styles/FindPage.css"

function SignUp() {
    return(
    <div className='find-container'>
        <h1>회원가입</h1>
        <div className="find-password-subtitle-form">
            <p className="signup-email">이메일</p>
            <div className="find-submit-form">
                <input type="text" id="phone" placeholder="example@naver.com" />
            </div>
            
            <p className="signup-password">비밀번호</p>
            <div className="find-submit-form">
                <input type="text" id="code" placeholder="********" />
            </div>
            <div className="password-info">
                ✓ 영문/숫자/특수문자 중, 2가지 이상 포함<br/>
                ✓ 8자 이상 32자 이하 입력 (공백 제외)<br/>
                ✓ 연속 3자 이상 동일한 문자/숫자 제외
            </div>
            <p className="signupgit -password-confirm">비밀번호 확인</p>
            <div className="find-submit-form">
                <input type="text" id="code" placeholder="********" />
            </div>
            <button id="confirm">가입하기</button>
        </div>
    </div>
    );
}

export default SignUp;
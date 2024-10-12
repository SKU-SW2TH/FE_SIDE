import React from "react";
import "./FindPage.css"

function FindEmail() {
    return(
    <div className='find-container'>
        <h1>아이디(이메일) 찾기</h1>
        <p className="subText">계정에 등록된 휴대폰 번호를 인증하시면 사용 중인 계정의 이메일을 알려드립니다.</p>

        <div className="subtitle-form">
            <p className="phone">휴대폰 번호(숫자만 입력)</p>
            <div className="find-submit-form">
                <input type="number" id="phone" placeholder="01012341234" />
                <button id="find-submit-button">인증 요청</button>
            </div>
            
            <p className="code">인증번호</p>
            <div className="find-submit-form">
                <input type="number" id="code" placeholder="인증번호 입력" />
                <button id="find-submit-button">인증</button>
            </div>
        </div>
    </div>
    );
}

export default FindEmail;
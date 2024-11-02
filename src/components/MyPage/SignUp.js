import React, { useState } from "react";
import "../../styles/FindPage.css";
import eye from "../../assets/images/eye.png";
import closedeye from "../../assets/images/closedeye.png";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState("");
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [isComplexityValid, setIsComplexityValid] = useState(false);
    const [isRepetitionValid, setIsRepetitionValid] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [isVerificationVisible, setIsVerificationVisible] = useState(false);

    // 이메일 유효성 검사 함수
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);

        if (isEmailTouched) {
            if (!validateEmail(inputEmail)) {
                setEmailError("✗ 올바른 이메일 형식을 입력해주세요.");
            } else if (inputEmail === "already@used.com") {
                setEmailError("이미 가입된 이메일입니다.");
            } else {
                setEmailError("");
            }
        }
    };

    const handleEmailBlur = () => {
        setIsEmailTouched(true);
        if (!validateEmail(email)) {
            setEmailError("✗ 올바른 이메일 형식을 입력해주세요.");
        } else {
            setEmailError("");
        }
    };

    const handleEmailVerification = () => {
        setIsVerificationVisible(true);
    };

    // 비밀번호 유효성 검사 함수
    const validatePassword = (password) => {
        setIsLengthValid(password.length >= 8 && password.length <= 32);
        setIsComplexityValid(/^(?=.*[A-Za-z])(?=.*\d|.*[^\w\s]).{2,}/.test(password));
        setIsRepetitionValid(!/(.)\1\1/.test(password));
    };

    const handlePasswordChange = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
        setIsPasswordTouched(true); // 비밀번호가 변경될 때 즉시 유효성 검사를 표시
        validatePassword(inputPassword);

        if (confirmPassword && inputPassword !== confirmPassword) {
            setPasswordMatchError("비밀번호가 일치하지 않습니다.");
        } else {
            setPasswordMatchError("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const inputConfirmPassword = e.target.value;
        setConfirmPassword(inputConfirmPassword);

        if (inputConfirmPassword !== password) {
            setPasswordMatchError("비밀번호가 일치하지 않습니다.");
        } else {
            setPasswordMatchError("");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const isPasswordInvalid = !isLengthValid || !isComplexityValid || !isRepetitionValid;

    return (
        <div className="find-container">
            <div className="signup-title">회원가입</div>
            <div className="find-password-subtitle-form">
                <p className="signup-email">이메일</p>
                <div className="find-submit-form-email">
                    <input
                        type="text"
                        id="email"
                        placeholder="example@naver.com"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        style={{
                            borderColor: isEmailTouched && emailError ? "red" : "",
                        }}
                    />
                    <button onClick={handleEmailVerification} className="verify-button">
                        이메일 인증
                    </button>
                </div>
                <div className="password-info-emailerror">
                    {isEmailTouched && emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div>
                    {isVerificationVisible && (
                        <>
                            <input
                                type="text"
                                placeholder="인증번호 입력"
                                value={verificationCode}
                                id="email-code-input"
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <button className="verify-button">인증하기</button>
                        </>
                    )}
                </div>

                <p className="signup-nickname">닉네임</p>
                <div className="find-submit-form">
                    <input type="text" id="phone" placeholder="홍길동" />
                </div>
                <div className="password-info">
                    <div className="password-info01">
                        ✓ 닉네임 특수문자 사용불가<br />
                    </div>
                </div>

                <p className="signup-password">비밀번호</p>
                <div className="find-submit-form">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        id="code"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{
                            borderColor: isPasswordTouched && isPasswordInvalid ? "red" : "",
                        }}
                    />
                    <span className="toggle-password" onClick={togglePasswordVisibility}>
                        {showPassword ? (
                            <img src={closedeye} alt="closedeye" className="closedeye" />
                        ) : (
                            <img src={eye} alt="eye" className="eye" />
                        )}
                    </span>
                </div>

                <div className="password-info">
                    <p className={`password-info01 ${isPasswordTouched ? (isComplexityValid ? "valid" : "invalid") : ""}`}>
                        {isPasswordTouched ? (isComplexityValid ? "✓" : "✗") : "✓"} 영문/숫자/특수문자 중, 2가지 이상 포함
                    </p>
                    <p className={`password-info02 ${isPasswordTouched ? (isLengthValid ? "valid" : "invalid") : ""}`}>
                        {isPasswordTouched ? (isLengthValid ? "✓" : "✗") : "✓"} 8자 이상 32자 이하 입력 (공백 제외)
                    </p>
                    <p className={`password-info03 ${isPasswordTouched ? (isRepetitionValid ? "valid" : "invalid") : ""}`}>
                        {isPasswordTouched ? (isRepetitionValid ? "✓" : "✗") : "✓"} 연속 3자 이상 동일한 문자/숫자 제외
                    </p>
                </div>

                <p className="signup-password-confirm">비밀번호 확인</p>
                <div className="find-submit-form">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="********"
                        id="code"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        style={{
                            borderColor: passwordMatchError ? "red" : "",
                        }}
                    />
                    <span className="toggle-password" onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? (
                            <img src={closedeye} alt="closedeye" className="closedeye" />
                        ) : (
                            <img src={eye} alt="eye" className="eye" />
                        )}
                    </span>
                </div>
                <div className="password-info">
                    {passwordMatchError && (
                        <p className="error-message" style={{ color: "red" }}>
                            ✗ {passwordMatchError}
                        </p>
                    )}
                </div>

                <div className="confirm-button">
                    <button id="confirm">가입하기</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

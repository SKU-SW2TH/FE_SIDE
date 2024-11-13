import React, { useState, useEffect } from "react";
import "../../styles/FindPage.css";
import eye from "../../assets/images/eye.png";
import closedeye from "../../assets/images/closedeye.png";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import NotificationModal from './NotificationModal';


function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [sendEmailSuccessMessage, setSendEmailSuccessMessage] = useState("");
    const [verifyCodeSuccessMessage, setVerifyCodeSuccessMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [verifyCodeError, setVerifyCodeError] = useState("");
    const [nicknameSuccessMessage, setNicknameSuccessMessage] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState("");
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [isComplexityValid, setIsComplexityValid] = useState(false);
    const [isRepetitionValid, setIsRepetitionValid] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [isVerificationVisible, setIsVerificationVisible] = useState(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 중복 확인 상태 추가
    const [passwordValid, setPasswordValid] = useState(false);
    const [nicknameValid, setNicknameValid] = useState(true);
    const [notification, setNotification] = useState('');  // 알림 메시지 상태
    const nevigate = useNavigate();

    // 이메일 유효성 검사 함수
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const showNotification = (message) => {
        setNotification(message);
    };

    useEffect(() => {
        // 알림 모달을 표시 후 3초 뒤에 자동으로 닫기
        if (notification) {
            const timer = setTimeout(() => setNotification(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
    
        if (isEmailTouched && !validateEmail(inputEmail)) {
            setEmailError("✗ 올바른 이메일 형식을 입력해주세요.");
            setSendEmailSuccessMessage(""); // 성공 메시지 초기화
        } else {
            setEmailError("");
        }
    };

    const validateNickname = (nickname) => {
        const specialCharRegex = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/;
        const isValid = !specialCharRegex.test(nickname);
        setNicknameValid(isValid);
        if (!isValid) {
            setNicknameError("✗ 닉네임 특수문자 사용불가");
            setNicknameSuccessMessage("");
        } else {
            setNicknameError("");
        }
        return isValid;
    };


    const verifyNickname = async (e) => {
        e.preventDefault();
        
        // 닉네임이 비어 있는지 확인
        if (!nickname) {
            setNicknameError('✗ 닉네임을 입력해주세요.');
            setNicknameSuccessMessage(''); // 성공 메시지 초기화
            return;
        }
    
        // 닉네임 유효성 검사
        if (!validateNickname(nickname)) return;

        try {
            const requestData = { nickname };
            const response = await axios.post(
                'http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/auth/verify-nickname',
                requestData
            );
    
            if (response.status === 200) {
                setNicknameSuccessMessage('✓ 사용 가능한 닉네임입니다.');
                setNicknameError('');
                setIsNicknameChecked(true); // 중복 확인 완료 상태로 설정
            }
        } catch (error) {
            setNicknameSuccessMessage('');
            if (error.response) {
                if (error.response.status === 409) {
                    setNicknameError('✗ 이미 사용 중인 닉네임입니다.');
                } else if (error.response.status === 500) {
                    setNicknameError('✗ 예기치 못한 오류가 발생했습니다.');
                }
            } else {
                setNicknameError('✗ 요청을 처리할 수 없습니다. 네트워크를 확인해주세요.');
            }
            setIsNicknameChecked(false); // 오류가 발생한 경우 중복 확인 실패로 설정
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!nicknameValid && !validatePassword(password)) {
            showNotification("닉네임 특수 문자 사용여부 및 비밀번호 형식을 확인 해주세요.");
            return;
        }

        if (!isNicknameChecked) {
            showNotification("닉네임 중복 확인을 해주세요.");
            return;
        }

        // 비밀번호 유효성을 재확인하여 제출 방지
        if (!validatePassword(password)) {
            showNotification("비밀번호 형식을 확인해 주세요.");
            return;
        }
        
        // 닉네임 유효성 검사
        if (!nicknameValid) {
            showNotification("닉네임 특수문자 사용 불가");
            return;
        }

    
        // 이메일, 닉네임, 비밀번호가 유효하다면 서버로 요청
        try {
          const response = await axios.post("http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/auth/join", {
            email: email,
            nickname: nickname,
            password: password,
          });
    
          if (response.status === 200) {
            showNotification("회원가입이 완료되었습니다");
            nevigate('/');
          }
        } catch (error) {
          if (error.response) {
            const status = error.response.status;
            if (status === 409) {
                showNotification("이미 가입된 이메일입니다.");
            } else if (status === 500) {
                showNotification("예기치 못한 오류가 발생했습니다.");
            }
          }
        }
      };
    

    const verifyEmailCode = async (e) => {
        e.preventDefault(); // 기본 동작 방지
    
        // 인증 코드가 비어 있는지 확인
        if (!verificationCode) {
            setVerifyCodeError('✗ 인증 코드를 입력해주세요.');
            setVerifyCodeSuccessMessage(''); // 성공 메시지 초기화
            return;
        }
    
        try {
            const requestData = {
                email: email,
                verificationCode: verificationCode
            };
    
            const response = await axios.post(
                'http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/auth/verify-email',
                requestData
            );
    
            if (response.status === 200) {
                setVerifyCodeSuccessMessage('✓ 이메일 인증이 완료되었습니다.');
                setVerifyCodeError(''); // 오류 메시지 초기화
            }
        } catch (error) {
            setVerifyCodeSuccessMessage(''); // 성공 메시지 초기화
            if (error.response) {
                if (error.response.status === 409) {
                    setVerifyCodeError('✗ 이미 사용 중인 이메일입니다.');
                } else if (error.response.status === 422) {
                    setVerifyCodeError('✗ 인증 코드가 올바르지 않습니다.');
                } else if (error.response.status === 500) {
                    setVerifyCodeError('✗ 예기치 못한 오류가 발생했습니다.');
                }
            } else {
                setVerifyCodeError('✗ 요청을 처리할 수 없습니다. 네트워크를 확인해주세요.');
            }
        }
    };    
    
    const sendVerificationEmail = async (email, e) => {
        e.preventDefault();
    
        if (!validateEmail(email)) {
            setEmailError("✗ 올바른 이메일 형식을 입력해주세요.");
            setSendEmailSuccessMessage(""); // 성공 메시지 초기화
            return;
        }
    
        try {
            const requestData = { email };
            const response = await axios.post(
                'http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/auth/send-verification-email',
                requestData
            );
    
            if (response.status === 200) {
                setSendEmailSuccessMessage("✓ 입력하신 이메일로 인증번호가 전송되었습니다.");
                setEmailError(""); // 오류 메시지 초기화
                setIsVerificationVisible(true);
            }
        } catch (error) {
            if (error.response) {
                setEmailError(
                    error.response.status === 500
                        ? "✗ 인증 코드를 생성하는 중 오류가 발생했습니다."
                        : "✗ 인증 코드를 저장하는 중 오류가 발생했습니다."
                );
            } else {
                setEmailError("✗ 요청을 처리할 수 없습니다. 네트워크를 확인해주세요.");
            }
            setSendEmailSuccessMessage(""); // 성공 메시지 초기화
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

    // 비밀번호 유효성 검사 함수
    const validatePassword = (password) => {
        const lengthValid = password.length >= 8 && password.length <= 32;
        const complexityValid = /^(?=.*[A-Za-z])(?=.*\d|.*[^\w\s]).{2,}/.test(password);
        const repetitionValid = !/(.)\1\1/.test(password);
        
        setIsLengthValid(lengthValid);
        setIsComplexityValid(complexityValid);
        setIsRepetitionValid(repetitionValid);
    
        return lengthValid && complexityValid && repetitionValid;
    };

    const handlePasswordChange = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
        setIsPasswordTouched(true);
    
        // validatePassword 결과에 따라 passwordValid 업데이트
        const isValid = validatePassword(inputPassword);
        setPasswordValid(isValid);
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
            <form onSubmit={handleSubmit}>
            <div className="signup-title">회원가입</div>
            <div className="find-password-subtitle-form">
                <p className="signup-email">이메일</p>
                <div className="find-submit-form-email">
                    <input
                        type="email"
                        id="email"
                        placeholder="example@naver.com"
                        value={email}
                        onChange={(e) => { 
                            setEmail(e.target.value);
                            handleEmailChange(e);
                        }}
                        onBlur={handleEmailBlur}
                        style={{
                            borderColor: isEmailTouched && emailError ? "red" : "",
                        }}
                    />
                    <button onClick={(e) => sendVerificationEmail(email, e)} className="verify-button">
                        이메일 인증
                    </button>
                </div>
                <div className="password-info-emailerror">
                    {isEmailTouched && emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div className="password-info-email-success">
                    {isEmailTouched && sendEmailSuccessMessage && <p className="send-email-success">{sendEmailSuccessMessage}</p>}
                </div>
                
                <div>
                    {isVerificationVisible && (
                        <>
                            <input
                                type="text"
                                placeholder="인증번호 입력"
                                value={verificationCode}
                                id="email-code-input"
                                onChange={(e) => { 
                                            setVerificationCode(e.target.value);
                                }}
                                required
                            />
                            <button className="verify-button" onClick={verifyEmailCode}>
                                인증하기
                            </button>
                            <div className="password-info-emailcode-error">
                                {verifyCodeError && <p className="error-message" style={{ color: "red" }}>{verifyCodeError}</p>}
                            </div>
                            <div className="password-info-emailcode-success">
                                {verifyCodeSuccessMessage && <p className="send-email-success">{verifyCodeSuccessMessage}</p>}
                            </div>
                        </>
                    )}
                </div>

                <p className="signup-nickname">닉네임</p>
                <div className="find-submit-form-nickname">
                    <input
                        type="text"
                        id="nickname"
                        placeholder="홍길동"
                        value={nickname}
                        onChange={(e) => {
                            setNickname(e.target.value);
                            setIsNicknameChecked(false); // 닉네임이 변경될 때마다 중복 확인 상태 초기화
                            validateNickname(e.target.value);
                          }}
                        required
                    />
                    <button onClick={verifyNickname} className="verify-button">
                        중복확인
                    </button>
                    <div className="nickname-error-message">
                        {nicknameError && <p className="error-message">{nicknameError}</p>}
                    </div>
                    <div className="nickname-success-message">
                        {nicknameSuccessMessage && <p>{nicknameSuccessMessage}</p>}
                    </div>
                    {!nickname && !nicknameError && !nicknameSuccessMessage && (
                        <div className="nickname-info">
                                <p className="nickname-info-p">✓ 닉네임 특수문자 사용불가</p>
                        </div>
                    )}
                </div>
               
                <p className="signup-password">비밀번호</p>
                <div className="find-submit-form">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        id="code"
                        value={password}
                        onChange={(e) => {
                            validatePassword(e.target.value);
                            handlePasswordChange(e);
                          }}
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
                        onChange={(e) => {
                            handleConfirmPasswordChange(e);
                          }}
                        style={{
                            borderColor: passwordMatchError ? "red" : "",
                        }}
                        required
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
                    <button type="submit" id="confirm">가입하기</button>
                </div>
            </div>
            </form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {notification && <NotificationModal message={notification} onClose={() => setNotification('')} />}
        </div>
    );
}

export default SignUp;

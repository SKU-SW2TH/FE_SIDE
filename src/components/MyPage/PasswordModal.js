import React, { useState } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc; // 오류에 따라 테두리 색상 변경
  border-radius: 4px;
  transition: border-color 0.3s ease; // 부드러운 전환 효과 추가

  &:focus {
    border-color: ${({ isError }) => (isError ? "red" : "#57c179")}; // 포커스 시 테두리 색상 변경
    outline: none; // 기본 outline 제거
  }
`;

const ModalButton = styled.button`
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #58c079;
  color: white;
  &:hover {
    background-color: #50b06e;
  }
`;

const Condition = styled.p`
  color: ${({ isValid }) => {
    if (isValid === null) return "gray"; // 초기 상태 회색
    return isValid ? "green" : "red"; // 유효성에 따라 초록색 또는 빨간색
  }};
`;

function PasswordModal({ isOpen, onClose, currentPassword, setCurrentPassword, onSubmit }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLengthValid, setIsLengthValid] = useState(null);
  const [isComplexityValid, setIsComplexityValid] = useState(null);
  const [isRepetitionValid, setIsRepetitionValid] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState(""); // 비밀번호 불일치 오류 메시지

  const validatePassword = (password) => {
    setIsLengthValid(password.length >= 8 && password.length <= 32);
    setIsComplexityValid(/^(?=.*[A-Za-z])(?=.*\d|.*[^\w\s]).{2,}/.test(password));
    setIsRepetitionValid(!/(.)\1\1/.test(password));
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    validatePassword(password);

    // 비밀번호 확인 일치 여부 확인
    if (confirmPassword && password !== confirmPassword) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);

    // 비밀번호 일치 여부를 즉시 확인
    if (confirmPassword !== newPassword) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleClose = () => {
    setCurrentPassword(""); // 현재 비밀번호 초기화
    setNewPassword(""); // 새 비밀번호 초기화
    setConfirmPassword(""); // 새 비밀번호 확인 초기화
    setIsLengthValid(null); // 비밀번호 유효성 초기화
    setIsComplexityValid(null); // 비밀번호 유효성 초기화
    setIsRepetitionValid(null); // 비밀번호 유효성 초기화
    setPasswordMatchError(""); // 비밀번호 불일치 오류 초기화
    onClose(); // 모달 닫기
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword && isLengthValid && isComplexityValid && isRepetitionValid) {
      onSubmit(); // 비밀번호 변경 핸들러 호출
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalTitle>비밀번호 설정</ModalTitle>
        <form onSubmit={handleSubmit}>
          <ModalInput 
            type="password" 
            placeholder="현재 비밀번호" 
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)} 
            required 
          />
          <ModalInput 
            type="password" 
            placeholder="새 비밀번호" 
            value={newPassword} 
            onChange={handleNewPasswordChange} 
            required 
            isError={newPassword && (!isLengthValid || !isComplexityValid || !isRepetitionValid)} // 새 비밀번호 입력 시 유효성 검사
          />
          <div>
            <Condition isValid={isLengthValid}>
              {isLengthValid === null ? "✓ 8자 이상 32자 이하 입력 (공백 제외)" : isLengthValid ? "✓ 8자 이상 32자 이하 입력 (공백 제외)" : "✗ 8자 이상 32자 이하 입력 (공백 제외)"}
            </Condition>
            <Condition isValid={isComplexityValid}>
              {isComplexityValid === null ? "✓ 영문/숫자/특수문자 중, 2가지 이상 포함" : isComplexityValid ? "✓ 영문/숫자/특수문자 중, 2가지 이상 포함" : "✗ 영문/숫자/특수문자 중, 2가지 이상 포함"}
            </Condition>
            <Condition isValid={isRepetitionValid}>
              {isRepetitionValid === null ? "✓ 연속 3자 이상 동일한 문자/숫자 제외" : isRepetitionValid ? "✓ 연속 3자 이상 동일한 문자/숫자 제외" : "✗ 연속 3자 이상 동일한 문자/숫자 제외"}
            </Condition>
          </div>
          <ModalInput 
            type="password" 
            placeholder="새 비밀번호 확인" 
            value={confirmPassword} 
            onChange={handleConfirmPasswordChange} 
            required 
            isError={confirmPassword && passwordMatchError} // 비밀번호 일치 오류에 따라 테두리 색상 변경
          />
          {passwordMatchError && (
            <p style={{ color: "red" }}>✗ {passwordMatchError}</p>
          )}
          <div style={{ textAlign: 'right' }}>
            <ModalButton type="button" onClick={handleClose}>취소</ModalButton>
            <ModalButton type="submit">설정</ModalButton>
          </div>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
}

export default PasswordModal;

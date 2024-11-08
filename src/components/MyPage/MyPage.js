import React, { useState } from "react";
import { useEffect } from "react";
import MyPageSideNav from "./MyPageSideNav";
import '../../styles/MyPage.css';
import PasswordModal from './PasswordModal';
import AccountDeletionModal from './AccountDeletionModal'; 
import useCheckTokenValidity from "../ReusableComponents/useCheckTokenValidity";
import { useNavigate } from "react-router-dom";
import profileImage from '../../assets/images/image.png';

function MyPage({ initialUserName, profileImage, userId }) {
  const [userName, setUserName] = useState(initialUserName || "박범준");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isDeletionModalOpen, setDeletionModalOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isTokenValid = useCheckTokenValidity();
  const navigate = useNavigate();
  const fixedUserId = "bj10111@naver.com";

  useEffect(() => {
    if (isTokenValid === false) {
      navigate('/');
      console.log(isTokenValid);
    }
  }, [isTokenValid, navigate]);

  if (!isTokenValid) {
    return null; // 유효하지 않으면 MyPage 컴포넌트 렌더링 중단
  }

  // 프로필 편집 핸들러
  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // 비밀번호 변경 핸들러
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("현재 비밀번호:", currentPassword);
    console.log("새 비밀번호:", newPassword);

    // 비밀번호 업데이트 로직 예시 (API 호출)
    // ...

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordModalOpen(false); // 모달 닫기
  };

  const handleCloseDeletionModal = () => {
    setDeletionModalOpen(false);
  };

  const handleDeletionConfirmed = () => {
    // 탈퇴 완료 시 페이지 이동 등의 추가 로직
    alert("탈퇴가 완료되었습니다.");
    setDeletionModalOpen(false); // 모달 닫기
  };

  return (
    <div className="container">
      <MyPageSideNav />

      <div className="grid-container">
        {isEditingProfile ? (
          <div className="grid-item01-forsave">
            <p className="grid-title">내 프로필</p>
            <div className="grid-subtitle-image">
              이미지 <img className="profileImage-edit" src={profileImage} alt="Profile" />
              <button className="changeButton">변경</button>
              <div className="image-text">
                <p>✓ png, jpg, jpeg의 확장자</p>
                <p>✓ 1MB 이하의 이미지</p>
              </div>
            </div>
            <div className="grid-subtitle-forsave">
              <p>
                닉네임
                <span className="nickname">
                  <input
                    type="text"
                    name="profile-name"
                    className="nickname-input"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </span>
              </p>
              <p className="self-introduce-edit">
                자기소개
                <textarea
                  id="introduce-edit"
                  placeholder="나만의 스킬, 깃허브 링크 등으로 소개글을 채워보세요."
                />
              </p>
              <div className="button-container">
                <button className="profile-cancel-button" onClick={handleCancelEdit}>
                  취소
                </button>
                <button className="profile-edit-button" onClick={handleSaveProfile}>
                  저장
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid-item01">
            <p className="grid-title">내 프로필</p>
            <div className="grid-subtitle-image">
              이미지 <img className="profileImage-edit" src="img/image.png" alt="Profile" />
            </div>
            <div className="grid-subtitle">
              <p>
                닉네임
                <span className="nickname">{userName}</span>
              </p>
              <div className="introduce-editself">
                <p>
                  자기소개
                  <span className="profile-introduce">
                    나만의 스킬, 깃허브 링크 등으로 소개글을 채워보세요.
                  </span>
                </p>
              </div>
              <button className="profile-edit-button-before" onClick={handleEditProfile}>
                설정
              </button>
            </div>
          </div>
        )}

        <div className="grid-item02">
          <p className="grid-title">기본 정보</p>
          <div className="information">
            <div className="info-row-foremail">
              <span className="label">이메일</span>
              <span className="email">{fixedUserId}</span>
            </div>
            <div className="info-row">
              <span className="label">비밀번호</span>
              <span className="profile-password">비밀번호를 설정해주세요.</span>
              <button className="information-button" onClick={() => setPasswordModalOpen(true)}>
                설정
              </button>
            </div>
            <div className="info-row-deletion">
              {/* AccountDeletionModal 컴포넌트 */}
              <AccountDeletionModal
              isOpen={isDeletionModalOpen}
              onClose={handleCloseDeletionModal}
              onConfirmed={handleDeletionConfirmed}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PasswordModal 컴포넌트 */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onSubmit={handleChangePassword}
      />
    </div>  
  ); 
}

export default MyPage;

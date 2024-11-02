import React, { useState } from "react";
import MyPageSideNav from "./MyPageSideNav";
import '../../styles/MyPage.css';

function MyPage({ initialUserName, profileImage, userId }) {
    // 상태 관리: 현재 사용자 이름 및 비밀번호 관련 상태
    const [userName, setUserName] = useState(initialUserName || "박범준");
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    
    // 비밀번호 관련 상태
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // userId 고정값 설정
    const fixedUserId = "bj10111@naver.com"; // 고정된 이메일

    // 프로필 편집 화면 전환 함수
    const handleEditProfile = () => {
        setIsEditingProfile(true);
        setIsChangingPassword(false);
    };

    // 프로필 저장 함수
    const handleSaveProfile = () => {
        // 저장 로직 추가 가능
        setIsEditingProfile(false);
    };

    // 편집 취소 함수
    const handleCancelEdit = () => {
        setIsEditingProfile(false);
        setIsChangingPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    // 비밀번호 변경 상태 전환 함수
    const handleChangePasswordToggle = () => {
        setIsChangingPassword(true);
        setIsEditingProfile(false); // 프로필 편집 비활성화
    };

    // 비밀번호 변경 함수
    const handleChangePassword = () => {
        console.log('Current Password:', currentPassword);
        console.log('New Password:', newPassword);
        console.log('Confirm Password:', confirmPassword);
        // 비밀번호 변경 후 상태 초기화
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsChangingPassword(false); // 비밀번호 입력 필드 숨김
    };

    return (
        <div>
            <div className='container'>
                <MyPageSideNav userName={userName} profileImage={profileImage} />

                {/* 상단 프로필 수정 화면 */}
                {isEditingProfile ? (
                    <div className="grid-container">
                        <div className="grid-item01-forsave">
                            <p className="grid-title">내 프로필</p>
                            <div className="grid-subtitle-image">
                                이미지 <img className="profileImage-edit" src="img/image.png" alt="Profile" />
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
                                            value={userName} 
                                            onChange={(e) => setUserName(e.target.value)} 
                                        />
                                    </span>
                                </p>
                                <p className="self-introduce-edit">
                                    자기소개
                                    <textarea
                                        type="text"
                                        id="introduce-edit"
                                        placeholder="나만의 스킬, 깃허브 링크 등으로 소개글을 채워보세요."
                                    />
                                </p>
                                <div className="button-container">
                                    <button className="profile-cancel-button" onClick={handleCancelEdit}>취소</button>
                                    <button className="profile-edit-button" onClick={handleSaveProfile}>저장</button>
                                </div>
                            </div>
                        </div>

                        {/* 하단 기본 정보 화면 */}
                        <div className="grid-item02">
                            <p className="grid-title">기본 정보</p>
                            <div className="information">
                                <div className="info-row-foremail">
                                    <span className="label">이메일</span>
                                    <span className="email">{fixedUserId}</span>
                                </div>
                                {!isChangingPassword ? ( // isChangingPassword가 false일 때만 표시
                                    <div className="info-row">
                                        <span className="label">비밀번호</span>
                                        <span className="profile-password">비밀번호를 설정해주세요.</span>
                                        <button className="information-button" onClick={handleChangePasswordToggle}>
                                            설정
                                        </button>
                                    </div>
                                ) : null} {/* 비밀번호 정보를 숨김 */}

                                {isChangingPassword && ( // 비밀번호 변경 입력 필드 표시
                                    <div className="password-change-section">
                                        <div className="info-row">
                                            <span className="label">현재 비밀번호</span>
                                            <input 
                                                type="password" 
                                                value={currentPassword} 
                                                onChange={(e) => setCurrentPassword(e.target.value)} 
                                                placeholder="현재 비밀번호"
                                            />
                                        </div>
                                        <div className="info-row">
                                            <span className="label">새 비밀번호</span>
                                            <input 
                                                type="password" 
                                                value={newPassword} 
                                                onChange={(e) => setNewPassword(e.target.value)} 
                                                placeholder="새 비밀번호"
                                            />
                                        </div>
                                        <div className="info-row">
                                            <span className="label">새 비밀번호 확인</span>
                                            <input 
                                                type="password" 
                                                value={confirmPassword} 
                                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                                placeholder="새 비밀번호 확인"
                                            />
                                        </div>
                                        <div className="button-container">
                                            <button className="profile-cancel-button" onClick={handleCancelEdit}>취소</button>
                                            <button className="profile-edit-button" onClick={handleChangePassword}>저장</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    // 기본 프로필 보기 화면
                    <div className="grid-container">
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
                                <button className="profile-edit-button-before" onClick={handleEditProfile}>설정</button>
                            </div>
                        </div>

                        <div className="grid-item02">
                            <p className="grid-title">기본 정보</p>
                            <div className="information">
                                <div className="info-row-foremail">
                                    <span className="label">이메일</span>
                                    <span className="email">{fixedUserId}</span>
                                </div>
                                {!isChangingPassword ? ( // 비밀번호 정보를 숨김
                                    <div className="info-row">
                                        <span className="label">비밀번호</span>
                                        <span className="profile-password">비밀번호를 설정해주세요.</span>
                                        <button className="information-button" onClick={handleChangePasswordToggle}>
                                            설정
                                        </button>
                                    </div>
                                ) : null}

                                {isChangingPassword && ( // 비밀번호 변경 입력 필드 표시
                                    <div className="password-change-section">
                                        <div className="info-row">
                                            <span className="label">현재 비밀번호</span>
                                            <input 
                                                type="password" 
                                                value={currentPassword} 
                                                className="newpwd"
                                                onChange={(e) => setCurrentPassword(e.target.value)} 
                                                placeholder="현재 비밀번호"
                                            />
                                        </div>
                                        <div className="info-row">
                                            <span className="label">새 비밀번호</span>
                                            <input 
                                                type="password" 
                                                value={newPassword} 
                                                className="newpwd"
                                                onChange={(e) => setNewPassword(e.target.value)} 
                                                placeholder="새 비밀번호"
                                            />
                                        </div>
                                        <div className="info-row">
                                            <span className="label">새 비밀번호 확인</span>
                                            <input 
                                                type="password" 
                                                value={confirmPassword} 
                                                className="newpwd"
                                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                                placeholder="새 비밀번호 확인"
                                            />
                                        </div>
                                        <div className="button-container">
                                            <button className="profile-cancel-button" onClick={handleCancelEdit}>취소</button>
                                            <button className="profile-edit-button" onClick={handleChangePassword}>저장</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyPage;

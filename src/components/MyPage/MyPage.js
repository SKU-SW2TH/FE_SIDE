import React, { useState, useEffect } from "react";
import MyPageSideNav from "./MyPageSideNav";
import '../../styles/MyPage.css';
import PasswordModal from './PasswordModal';
import AccountDeletionModal from './AccountDeletionModal'; 
import AccountRestoreModal from './AccountRestoreModal'; 
import defaultProfile from '../../assets/images/image.png';
import { useNavigate } from "react-router-dom";
import ProfileNotificationModal from './ProfileNotificationModal';
import axios from "axios";

function MyPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [article, setArticle] = useState("");
  const [image, setImage] = useState(null);  // 이미지 상태 관리
  const [imageForSend, setImageForSend] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isDeletionModalOpen, setDeletionModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [deletedAt, setDeletedAt] = useState(false);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  const fetchProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/info`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );
      const { email, nickname, introduce, profile, deletedAt } = response.data;
      setUserName(nickname); // 닉네임 업데이트
      setArticle(introduce); // 자기소개 업데이트
      setEmail(email);
      setImage(profile || defaultProfile); // 프로필 사진 업데이트
      console.log("프로필업데이드 status:" + response.status);
      console.log(response.data);
      if(deletedAt !== null) {
        setDeletedAt(true);
      }
    } catch (error) {
      console.error("프로필 정보를 불러오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    // localStorage에서 accessToken 가져오기
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
        console.log("accessToken 필요")
        navigate('/');
    } else {
      fetchProfile(); // 컴포넌트가 마운트될 때 프로필 정보 가져오기
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    // 로딩 중일 때 화면 표시 방지
    return null;
  }

  const updateProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const formData = new FormData();

    if (imageForSend === null) {
        formData.append('profilePicture', ''); // 또는 서버가 지정한 특별한 값
    } else {
        formData.append('profilePicture', imageForSend);
    } 
    formData.append('nickname', userName);
    formData.append('introduction', article);
    
    try {
        // 서버에 resetToken 유효성 검사를 GET 방식으로 요청
        const response = await axios.patch(
            `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/update/profile`,
            formData,
            {
              headers: { 
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
              }
            }
        );

        if (response.status === 200) {
            console.log(response.status);
            setIsEditingProfile(false);
            window.location.reload();
        } 
    } catch (error) {
      if(error.response){
        if(error.response.status === 409) {
          setModalContent("사용중인 닉네임입니다.");
          setShowModal(true);
        } else if(error.response.status === 500) {
          setModalContent("파일 형식을 확인해 주세요.");
          setShowModal(true);
      }
      }
    }
  };

  const handleCloseDeletionModal = () => {
    setDeletionModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];  // 선택된 첫 번째 파일 가져오기
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png']; // 허용된 확장자
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (file) {
        if (file.size > maxFileSize) {
          setModalContent("이미지 크기는 5MB 이하여야 합니다.");
          setShowModal(true);
          return;
        }
        // 파일 확장자 확인
        if (!validExtensions.includes(file.type)) {
          setModalContent("이미지는 jpeg, jpg, png 형식만 가능합니다.");
          setShowModal(true);
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImageForSend(file);
          setImage(reader.result);
        };
    }
  };
  

  // 프로필 편집 핸들러
  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleDeletionConfirmed = () => {
    // 탈퇴 완료 시 페이지 이동 등의 추가 로직
    alert("탈퇴가 완료되었습니다.");
    setDeletionModalOpen(false); // 모달 닫기
  };

  const handleTextChange = (e) => {
    const maxChars = 50; // 최대 글자 수
    const inputText = e.target.value;

    if (inputText.length > maxChars) {
        setModalContent(`자기소개는 최대 ${maxChars}자까지 작성할 수 있습니다.`);
        setShowModal(true);
        return;
    }
    setArticle(inputText); // 제한을 넘지 않을 경우 상태 업데이트
  };

  const handleMouseEnter = () => {
    if (image !== defaultProfile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDeleteImage = () => {
    setImage(defaultProfile);
    setImageForSend(null);
    setIsHovered(false);
  };

  return (
    <div className="container">
      <MyPageSideNav />

      <div className="grid-container">
        {isEditingProfile ? (
          <div className="grid-item01-forsave">
            <p className="grid-title">내 프로필</p>
            <div 
            className="grid-subtitle-image"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
              <input
                type="file"
                id="fileInput"
                onChange={handleImageChange}
                style={{ display: 'none' }}  // 파일 입력 필드를 숨김
              />
              이미지{!image && <img src={defaultProfile} className="profileImage-edit" alt="defaultProfile"/>}
              {image && (
              <>
                <img 
                  src={image} 
                  className="profileImage-edit" 
              alt="Selected"
            />
            {isHovered && image !== defaultProfile && (
              <button 
                className="delete-image-button"
                onClick={handleDeleteImage}
              >
                ✕
              </button>
            )}
          </>
        )}
              <button className="changeButton" onClick={() => document.getElementById('fileInput').click()}>변경</button>
              <div className="image-text">
                <p>✓ png, jpg, jpeg의 확장자</p>
                <p>✓ 5MB 이하의 이미지</p>
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
                  placeholder= "나만의 스킬, 깃허브 링크 등으로 소개글을 채워보세요."
                  value={article || ''}
                  onChange={handleTextChange}
                />
              </p>
              <div className="button-container">
                <button className="profile-cancel-button" onClick={handleCancelEdit}>
                  취소
                </button>
                <button className="profile-edit-button" onClick={updateProfile}>
                  저장
                </button>
              </div>
            </div>
            {showModal && (
            <ProfileNotificationModal content={modalContent} onClose={() => setShowModal(false)} />
            )}
          </div>
        ) : (
          <div className="grid-item01">
            <p className="grid-title">내 프로필</p>
            <div className="grid-subtitle-image">
              이미지 {!image && <img src={defaultProfile} className="profileImage-edit" alt="defaultProfile"/>}
              {image && <img src={image} className="profileImage-edit" alt="Selected"/>}
            </div>
            <div className="grid-subtitle">
              <p>
                닉네임
                <span className="nickname">{userName}</span>
              </p>
              <div className="introduce-editself">
                <p>
                  자기소개
                  {!article ? (
                  <span className="profile-introduce">
                    나만의 스킬, 깃허브 링크 등으로 소개글을 채워보세요.
                  </span>
                  ) : (
                    <span className="article-content">{article}</span>
                  )}
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
              <span className="email">{email}</span>
            </div>
            <div className="info-row">
              <span className="label">비밀번호</span>
              <span className="profile-password">비밀번호를 설정해주세요.</span>
              <button className="information-button" onClick={() => setPasswordModalOpen(true)}>
                설정
              </button>
            </div>
            {deletedAt ? 
              ( <div className="info-row-deletion">
                <AccountRestoreModal
                  isOpen={isDeletionModalOpen}
                  onClose={handleCloseDeletionModal}
                  onConfirmed={handleDeletionConfirmed}
                  />
                </div>
            ) : 
            ( <div className="info-row-deletion">
              <AccountDeletionModal
              isOpen={isDeletionModalOpen}
              onClose={handleCloseDeletionModal}
              onConfirmed={handleDeletionConfirmed}
              />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PasswordModal 컴포넌트 */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />
    </div>  
  ); 
}

export default MyPage;

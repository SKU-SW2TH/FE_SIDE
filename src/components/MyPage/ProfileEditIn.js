import React from "react";
import EditProfileSideNav from "./EditProfileSideNav";
import { Link } from 'react-router-dom';
import '../../styles/MyPage.css';


function ProfileEditIn({ userName, profileImage, userId }) {
    userName="박범준";
    userId="bj10111@naver.com";
    
    return(
        <div>
            <div className='container'>
                
                <EditProfileSideNav userName="박범준" profileImage="img/image.png" />
                
                <div className="grid-container">
                    <div className="grid-item01-forsave">
                        <p className="grid-title">내 프로필</p>
                        <div className="grid-subtitle-image">
                            이미지 <img className="profileImage-edit" src="img/image.png"/>
                            <button className="changeButton">변경</button>
                            <div className="image-text">
                                <p>✓ png, jpg, jpeg의 확장자</p>
                                <p>✓ 1MB 이하의 이미지</p>
                            </div>
                        </div>
                        <div className="grid-subtitle-forsave">
                            <p>
                                닉네임
                                <span className="nickname"><input type="text" name="profile-name" placeholder={userName}/></span>
                            </p>
                            <p>
                                자기소개
                                <textarea type="text" id="introduce-edit" placeholder="나만의 스킬, 깃허브 링크 등으로 소개글을 채워보세요."/>
                            </p>
                            {/* maxLength로 글자수 조절가능 */}
                            <Link id="btn-link" to="/edit-profile"><button className="profile-edit-button">저장</button></Link>
                        </div>
                    </div>

                    <div className="grid-item02">
                        <p className="grid-title">기본 정보</p>
                        <div className="information">
                            <div className="info-row">
                                <span className="label">이메일</span>
                                <span className="email">{userId}</span>
                                <Link id="btn-link" to="/edit-email"><button className="information-button">설정</button></Link>
                            </div>
                            <div className="info-row">
                                <span className="label">비밀번호</span>
                                <span className="profile-password">비밀번호를 설정해주세요.</span>
                                <Link id="btn-link" to="/mypage"><button className="information-button">설정</button></Link>
                            </div>
                            <div className="info-row">
                                <span className="label">휴대폰 번호</span>
                                <span className="profile-phone">휴대폰 번호를 인증해주세요.</span>
                                <Link id="btn-link" to="/mypage"><button className="information-button">설정</button></Link>
                            </div>
                    </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileEditIn;
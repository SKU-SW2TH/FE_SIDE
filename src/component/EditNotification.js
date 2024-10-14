import React from "react";
import EditProfileSideNav from "./EditProfileSideNav";
import '../styles/MyPage.css';
import ToggleSwitch from "./ToggleSwitch";

function EditNotification() {
    return(
        <div>
            <div className='container'>
                <EditProfileSideNav userName="박범준" profileImage="img/image.png" />
            <div className="grid-contatiner">
                <label className="noti-title01">
                    <p>알림 설정</p>
                    <p className="noti-sub">이메일 수신 여부를 설정할 수 있어요. 회원약관 변경, 결제내역 등 필수적으로 안내되어야 하는 내용은 수신여부와 상관 없이 계속 발송됩니다.</p>
                </label>
                <div className="grid-item-noti01">
                    <p className="grid-title">공지사항</p>
                    <div className="noti-title02">
                        <p className="noti-sub">중요한 공지사항, 기능 업데이트 등 새로운 인프런 소식을 받을 수 있어요.</p>
                        <ToggleSwitch/>
                    </div>            
                </div>
                <div className="grid-item-noti01">
                    <p className="grid-title">커뮤니티 댓글</p>
                    <div className="noti-title02">
                        <p className="noti-sub">작성한 게시글의 댓글, 대댓글이 등록될 때 알림을 받을 수 있어요.</p>
                        <ToggleSwitch/>
                    </div>            
                </div>
            </div>
            </div>
        </div>
    );
}

export default EditNotification;
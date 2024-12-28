import React, { useState, useEffect } from "react";
import MyPageSideNav from "./MyPageSideNav";
import '../../styles/MyPage.css';
import ToggleSwitch from "../ReusableComponents/ToggleSwitch";
import axios from "axios";

function EditNotification() {
    const [boardNotification, setBoardNotification] = useState(false);
    const [studyNotification, setStudyNotification] = useState(false);
    const [settingIds, setSettingIds] = useState({ board: null, study: null });

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
          const { settings } = response.data;
          console.log("프로필업데이드 status:" + response.status);
          console.log(response.data);
          
          settings.forEach(setting => {
            if (setting.categoryDTO.id === 1) { // 게시판
                setBoardNotification(setting.enabled);
                setSettingIds(prev => ({ ...prev, board: setting.settingId }));
            } else if (setting.categoryDTO.id === 2) { // 스터디
                setStudyNotification(setting.enabled);
                setSettingIds(prev => ({ ...prev, study: setting.settingId }));
            }
          });
        } catch (error) {
          console.error("프로필 정보를 불러오는 데 실패했습니다.", error);
        }
    };

    useEffect(() => {
        console.log("boardNotification 업데이트됨:", boardNotification);
    }, [boardNotification]);
    
    useEffect(() => {
        console.log("studyNotification 업데이트됨:", studyNotification);
    }, [studyNotification]);
    
    useEffect(() => {
        fetchProfile();
    }, []);

    const handleBoardToggle = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const newState = !boardNotification;
            
            const response = await axios.patch(
                'http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/update/notification',
                {
                    settingId: settingIds.board,
                    enabled: newState
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                }
            );

            if (response.status === 200) {
                setBoardNotification(newState);
                console.log('게시판 알림 설정 변경 성공');
                console.log(response.status);
            }
        } catch (error) {
            console.error('게시판 알림 설정 변경 실패:', error);
            console.log(error.response.status);
        }
    };

    const handleStudyToggle = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const newState = !studyNotification;
            
            const response = await axios.patch(
                'http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/update/notification',
                {
                    settingId: settingIds.study,
                    enabled: newState
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                }
            );

            if (response.status === 200) {
                setStudyNotification(newState);
                console.log('스터디 알림 설정 변경 성공');
                console.log(response.status);
            }
        } catch (error) {
            console.error('스터디 알림 설정 변경 실패:', error);
            console.log(error.response.status);
        }
    };

    return(
        <div>
            <div className='container'>
                <MyPageSideNav/>
            <div className="grid-contatiner">
                <label className="noti-title01">
                    <p className="notification-maintitle">알림 설정</p>
                    <p className="noti-sub">이메일 수신 여부를 설정할 수 있어요. 회원약관 변경, 결제내역 등 필수적으로 안내되어야 하는 내용은 수신여부와 상관 없이 계속 발송됩니다.</p>
                </label>
                <div className="grid-item-noti01">
                    <p className="grid-title">게시판 알림</p>
                    <div className="noti-title02">
                        <p className="noti-sub">게시파 관련 알림을 받을 수 있어요.</p>
                        <ToggleSwitch 
                            isToggled={boardNotification} 
                            onToggle={handleBoardToggle}
                        />
                    </div>            
                </div>
                <div className="grid-item-noti01">
                    <p className="grid-title">스터디 알림</p>
                    <div className="noti-title02">
                        <p className="noti-sub">스터디 관련 알림을 받을 수 있어요.</p>
                        <ToggleSwitch 
                            isToggled={studyNotification} 
                            onToggle={handleStudyToggle}
                        />
                    </div>            
                </div>
            </div>
            </div>
        </div>
    );
}

export default EditNotification;
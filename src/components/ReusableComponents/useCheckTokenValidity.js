import axios from 'axios';
import { useEffect, useState } from 'react';

const useCheckTokenValidity = () => {
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('accessToken');

      try {
        const response = await axios.get('http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/notificationList', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setIsTokenValid(true); // 토큰이 유효하면 true로 설정
          console.log(response.status);
          console.log(isTokenValid);
        } 
      } catch (error) {
        // 인증 오류 처리
        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setIsTokenValid(false);
        } 
        // 서버 오류 시 refreshToken 재발급 시도
        else if (error.response && error.response.status === 500) {
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const res = await axios.post('http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/auth/reissue', { refreshToken });
            
            // 새로운 accessToken이 성공적으로 발급된 경우
            if (res.data && res.data.accessToken) {
              localStorage.setItem('accessToken', res.data.accessToken);
              localStorage.setItem('refreshToken', res.data.refreshToken);
              setIsTokenValid(true); // 새 토큰 발급 후 유효한 것으로 설정
            } else {
              throw new Error("Token 재발급 실패");
            }
          } catch {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setIsTokenValid(false);
          }
        }
      }
    };

    checkTokenValidity();
  }, []);

  return isTokenValid;
};

export default useCheckTokenValidity;

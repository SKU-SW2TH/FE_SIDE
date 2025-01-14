import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommunitySideNav from './CommunitySideNav'; // 사이드 네비게이션 컴포넌트
import '../../styles/Board.css';
import axios from 'axios';
import DOMPurify from 'dompurify'; // 새로운 import 추가
import Modal from 'react-modal'; // react-modal 추가 필요
import thumb from '../../assets/images/thumb.png';
import thumbed from '../../assets/images/thumbed.png';
import profileImage from '../../assets/images/image.png';
import CommunityStudySideNav from './CommunityStudySideNav'; // 추가된 사이드 네비게이션 컴포넌트

Modal.setAppElement('#root');

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState(''); // 댓글 입력을 최상위로 이동
  const [liked, setLiked] = useState(false); // 좋아요 상태 추가
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [replyText, setReplyText] = useState(''); // 대댓글 입력 상태 추가
  const [selectedCommentId, setSelectedCommentId] = useState(null); // 선택된 댓글 ID 상태 추가
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [userNickname, setUserNickname] = useState(''); // 사용자 닉네임 상태 추가
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 모달 상태 추가
  const [commentLiked, setCommentLiked] = useState({}); // 댓글 ID를 키로 하는 객체로 상태 관리
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] = useState(false); // 삭제 성공 모달 상태 추가
  const [replyLiked, setReplyLiked] = useState({}); // 대댓글 좋아요 상태 관리 추가
  const [isCommentReportModalOpen, setIsCommentReportModalOpen] = useState(false); // 댓글 신고 모달 상태 추가
  const [replyToReportId, setReplyToReportId] = useState(null); // 신고할 대댓글 ID 저장
  const [commentToReportId, setCommentToReportId] = useState(null);
  const [isReplyReportModalOpen, setIsReplyReportModalOpen] = useState(false); // 대댓글 신고 모달 상태 추가
  const [isEditingCommentId, setIsEditingCommentId] = useState(null); // 수정할 댓글 ID 상태 추가
  const [editingCommentText, setEditingCommentText] = useState(''); // 수정할 댓글 내용 상태 추가
  const navigate = useNavigate();

  const reportReasons = [
    { value: 'SPAM_ADVERTISING', label: '스팸홍보/도배입니다.' },
    { value: 'ILLEGAL_CONTENT', label: '불법정보를 포함하고 있습니다.' },
    { value: 'CONTENT_FOR_YOUTH', label: '청소년에 유해한 내용입니다.' },
    { value: 'VULGAR_OR_DISCRIMINATORY_EXPRESSION', label: '욕설/생명경시/혐오/차별적 표현입니다.' },
    { value: 'PERSONAL_INFORMATION_LEAK', label: '개인정보가 노출되었습니다.' },
    { value: 'INAPPROPRIATE_EXPRESSION', label: '불쾌한 표현이 있습니다.' }
  ];

  useEffect(() => {
    const initializePost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}`
        );
        const postData = response.data;
        
        // 게시글 정보 설정
        setPost({
          id: postData.postId,
          title: postData.title,
          content: postData.content,
          name: postData.postAuthorResponse.nickname,
          time: postData.createTime,
          view: postData.viewCount,
          files: postData.filesResponse,
          interests: postData.interestsResponse,
          category: postData.category
        });

        // 좋아요 상태 설정
        const userEmail = localStorage.getItem('email'); // localStorage에서 이메일 가져오기
        setLiked(postData.likerEmailsResponse.includes(userEmail)); // 이메일이 likerEmailsResponse에 포함되어 있는지 확인

        // 댓글 정보 설정 - 서버에서 받은 그대로 설정
        setComments(postData.commentsResponse);
        
        // 댓글 좋아요 상태 설정
        postData.commentsResponse.forEach(comment => {
          const userEmail = localStorage.getItem('email'); // localStorage에서 이메일 가져오기
          setCommentLiked(prev => ({
            ...prev,
            [comment.commentId]: comment.likerEmailsResponse.includes(userEmail) // 이메일이 likerEmailsResponse에 포함되어 있는지 확인
          }));
        });
        
        // 대댓글 좋아요 상태 설정
        postData.commentsResponse.forEach(comment => {
          comment.child.forEach(reply => {
            const userEmail = localStorage.getItem('email'); // localStorage에서 이메일 가져오기
            setReplyLiked(prev => ({
              ...prev,
              [reply.commentId]: reply.likerEmailsResponse.includes(userEmail) // 이메일이 likerEmailsResponse에 포함되어 있는지 확인
            }));
          });
        });
        
        console.log(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
      setIsLoading(false);
    };

    initializePost();
  }, [postId]);

  const interestData = [
    { name: 'React', icon: require('../../assets/images/react.svg').default },
    { name: 'Angular', icon: require('../../assets/images/angular.svg').default },
    { name: 'Vue.js', icon: require('../../assets/images/vuedotjs.svg').default },
    { name: 'Svelte', icon: require('../../assets/images/svelte.svg').default },
    { name: 'jQuery', icon: require('../../assets/images/jquery.svg').default },
    { name: 'Backbone.js', icon: require('../../assets/images/backbonedotjs.svg').default },
    { name: 'Preact', icon: require('../../assets/images/preact.svg').default },
    { name: 'Ember.js', icon: require('../../assets/images/emberdotjs.svg').default },
    { name: 'Node.js', icon: require('../../assets/images/nodedotjs.svg').default },
    { name: 'Spring', icon: require('../../assets/images/spring.svg').default },
    { name: 'Spring-Boot', icon: require('../../assets/images/springboot.svg').default },
    { name: 'Django', icon: require('../../assets/images/django.svg').default },
    { name: 'Flask', icon: require('../../assets/images/flask.svg').default },
    { name: 'Laravel', icon: require('../../assets/images/laravel.svg').default },
    { name: 'Ruby on Rails', icon: require('../../assets/images/rubyonrails.svg').default },
    { name: 'CakePHP', icon: require('../../assets/images/cakephp.svg').default },
    { name: 'Java', icon: require('../../assets/images/java.svg').default },
    { name: 'Python', icon: require('../../assets/images/python.svg').default },
    { name: 'C', icon: require('../../assets/images/c.svg').default },
    { name: 'C++', icon: require('../../assets/images/cplusplus.svg').default },
    { name: 'JavaScript', icon: require('../../assets/images/javascript.svg').default },
    { name: 'Go', icon: require('../../assets/images/go.svg').default },
    { name: 'PHP', icon: require('../../assets/images/php.svg').default },
    { name: 'Ruby', icon: require('../../assets/images/ruby.svg').default },
    { name: 'Kotlin', icon: require('../../assets/images/kotlin.svg').default },
    { name: 'Swift', icon: require('../../assets/images/swift.svg').default }
  ];

  useEffect(() => {
    // 사용자 닉네임을 localStorage에서 가져오기
    const nickname = localStorage.getItem('nickname');
    if (nickname) {
      setUserNickname(nickname);
    }
  }, []);

  const handleLike = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
          `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

      console.log(response.status);

      if (response.status === 201) {
        console.log("like api 응답:", response.status);
        setLiked(true);
      }
    } catch (error) {
      console.error("좋아요 상태 업데이트 중 오류:", error);
    }
  };

  const handleDeleteLike = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.delete(
          `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/like`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

      if (response.status === 200) {
        console.log("like api 응답:", response.status);
        setLiked(false); // 좋아요 취소 시 liked 상태를 false로 설정
      }
    } catch (error) {
      console.error("좋아요 상태 업데이트 중 오류:", error);
    }
  };

  // 좋아요 버튼 클릭 핸들러 추가
  const handleToggleLike = () => {
    if (liked) {
      handleDeleteLike(); // 좋아요가 눌려있으면 좋아요 취소
    } else {
      handleLike(); // 좋아요가 눌려있지 않으면 좋아요 추가
    }
  };

  // 이모지 필터링 함수 추가
  const filterEmoji = (str) => {
    return str.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
  };

  // 댓글 입력 핸들러 수정
  const handleComment = async () => {
    const filteredText = filterEmoji(commentText.trim());
    if (!filteredText) return;
    
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/comment`,
        {
          content: filteredText,
          level: 1
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 201) {
        console.log("댓글 작성 성공:", response.status);
        const updatedPost = await axios.get(
          `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}`
        );
        if (updatedPost.status === 200) {
          setComments(updatedPost.data.commentsResponse || []);
          setCommentText('');
        }
      }
    } catch (error) {
      console.error("댓글 작성 중 오류:", error);
    }
  };

  // 답글 입력 핸들러 수정
  const handleReplyToggle = (parentCommentId) => {
    if (selectedCommentId === parentCommentId) {
      setSelectedCommentId(null); // 이미 선택된 댓글이면 선택 해제
    } else {
      setSelectedCommentId(parentCommentId); // 선택된 댓글 ID 설정
    }
  };

  const handleReply = async (parentCommentId) => {
    const filteredText = filterEmoji(replyText.trim());
    if (!filteredText) return;

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/comment/${parentCommentId}/reply`,
        {
          content: filteredText,
          level: 2
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 201) {
        console.log("대댓글 작성 성공:", response.status);
        const updatedPost = await axios.get(
          `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}`
        );
        
        if(updatedPost.status === 200){
          setComments(updatedPost.data.commentsResponse || []);
          setReplyText('');
          setSelectedCommentId(null);
        }
      }
    } catch (error) {
      console.error("대댓글 작성 중 오류:", error);
      console.log(error.response.status);
    }
  };

  const handleReport = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/report`,
        {
          description: reportDescription,
          reportReason: reportReason,
          reportTargetType: "POST"
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setIsReportModalOpen(false);
      setReportReason('');
      setReportDescription('');
      
      if (response.status === 200) {
        console.log(response.status);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error("신고 처리 중 오류:", error);
      setIsReportModalOpen(false);
    }
  };

  const handleDeleteReply = async (parentCommentId, replyId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.delete(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/comment/${parentCommentId}/reply/${replyId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 200) {
        console.log("대댓글 삭제 성공:", response.status);
        // 댓글 목록을 다시 가져와서 상태 업데이트
        const updatedPost = await axios.get(
          `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}`
        );
        if (updatedPost.status === 200) {
          setComments(updatedPost.data.commentsResponse || []);
        }
      }
    } catch (error) {
      console.error("대댓글 삭제 중 오류:", error);
    }
  };

  const handleDeleteArticle = async () => {
    // 삭제 요청 처리 함수
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.delete(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 200) {
        console.log("게시글 삭제 성공:", response.status);
        // 추가적인 처리 (예: 리다이렉트 등)
      }
    } catch (error) {
      console.error("게시글 삭제 중 오류:", error);
    }
  };

  const confirmDeleteArticle = async () => {
    await handleDeleteArticle();
    setIsDeleteModalOpen(false); // 모달 닫기
    setIsDeleteSuccessModalOpen(true); // 삭제 성공 모달 열기
  };

  const handleConfirmDelete = () => {
    setIsDeleteSuccessModalOpen(false);
    navigate(-1);
  }

  const handleDeleteComment = async (commentId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.delete(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 200) {
        console.log("댓글 삭제 성공:", response.status);
        // 댓글 목록을 다시 가져와서 상태 업데이트
        const updatedPost = await axios.get(
          `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}`
        );
        if (updatedPost.status === 200) {
          setComments(updatedPost.data.commentsResponse || []);
        }
      }
    } catch (error) {
      console.error("댓글 삭제 중 오류:", error);
    }
  };

  // 댓글 좋아요 핸들러 추가
  const handleCommentLike = async (commentId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/comment/${commentId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 200) {
        console.log("댓글 좋아요 성공:", response.status);
        setCommentLiked(prev => ({ ...prev, [commentId]: true })); // 좋아요 상태 업데이트
      }
    } catch (error) {
      console.error("댓글 좋아요 중 오류:", error);
    }
  };

  // 댓글 좋아요 취소 핸들러 추가
  const handleDeleteCommentLike = async (commentId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.delete(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/comment/${commentId}/like`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 200) {
        console.log("댓글 좋아요 취소 성공:", response.status);
        setCommentLiked(prev => ({ ...prev, [commentId]: false })); // 좋아요 상태 업데이트
      }
    } catch (error) {
      console.error("댓글 좋아요 취소 중 오류:", error);
    }
  };
  
  // 대댓글 좋아요 핸들러 추가
  const handleReplyLike = async (parentCommentId, replyId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/comment/${parentCommentId}/reply/${replyId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 201) {
        console.log("대댓글 좋아요 성공:", response.status);
        setReplyLiked(prev => ({ ...prev, [replyId]: true })); // 대댓글 좋아요 상태 업데이트
      }
    } catch (error) {
      console.error("대댓글 좋아요 중 오류:", error);
    }
  };

  // 대댓글 좋아요 취소 핸들러 추가
  const handleDeleteReplyLike = async (parentCommentId, replyId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.delete(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/comment/${parentCommentId}/reply/${replyId}/like`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 200) {
        console.log("대댓글 좋아요 취소 성공:", response.status);
        setReplyLiked(prev => ({ ...prev, [replyId]: false })); // 대댓글 좋아요 상태 업데이트
      }
    } catch (error) {
      console.error("대댓글 좋아요 취소 중 오류:", error);
    }
  };

  // 댓글 좋아요 핸들러 추가
  const handleCommentToggleLike = (commentId) => {
    if (commentLiked[commentId]) {
      handleDeleteCommentLike(commentId); // 좋아요가 눌려있으면 좋아요 취소
    } else {
      handleCommentLike(commentId); // 좋아요가 눌려있지 않으면 좋아요 추가
    }
  };

  // 대댓글 좋아요 핸들러 추가
  const handleReplyToggleLike = (parentCommentId, replyId) => {
    if (replyLiked[replyId]) {
      handleDeleteReplyLike(parentCommentId, replyId); // 좋아요가 눌려있으면 좋아요 취소
    } else {
      handleReplyLike(parentCommentId, replyId); // 좋아요가 눌려있지 않으면 좋아요 추가
    }
  };

  // 대댓글 신고 핸들러 수정
  const handleReplyReport = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/comment/${replyToReportId.commentId}/reply/${replyToReportId.replyId}/report`,
        {
          description: reportDescription,
          reportReason: reportReason,
          reportTargetType: "POST"
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 200) {
        console.log("대댓글 신고 성공:", response.status);
        setIsReplyReportModalOpen(false);
        setReportReason('');
        setReportDescription('');
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error("대댓글 신고 중 오류:", error);
      setIsReplyReportModalOpen(false);
    }
  };

  // 대댓글 신고 모달 열기
  const openReplyReportModal = (commentId, replyId) => {
    setReplyToReportId({ commentId, replyId }); // 신고할 대댓글 ID 설정
    setIsReplyReportModalOpen(true); // 모달 열기
  };

  // 댓글 신고 핸들러 수정
  const handleCommentReport = async (commentId) => {
    if (!commentId) return; // commentId가 없으면 함수 종료
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post(
            `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/comment/${commentId}/report`,
            {
                description: reportDescription,
                reportReason: reportReason,
                reportTargetType: "POST"
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        if (response.status === 200) {
            console.log("댓글 신고 성공:", response.status);
            setIsCommentReportModalOpen(false);
            setReportReason('');
            setReportDescription('');
            setIsSuccessModalOpen(true);
        }
    } catch (error) {
        console.error("댓글 신고 중 오류:", error);
        setIsCommentReportModalOpen(false);
    }
  };

  // 댓글 수정 핸들러 추가
  const handleEditButtonClick = (commentId, content) => {
    setIsEditingCommentId(commentId); // 수정할 댓글 ID 설정
    setEditingCommentText(content); // 수정할 댓글 내용 설정
  };

  // 댓글 수정 완료 핸들러
  const handleEditCommentSubmit = async (commentId) => {
    await handleEditComment(commentId); // API 요청
    setIsEditingCommentId(null); // 수정 모드 종료
    setEditingCommentText(''); // 입력 필드 초기화
  };

  // 댓글 수정 핸들러 추가
  const handleEditComment = async (commentId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.patch(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/comment/${commentId}/edit?content=${encodeURIComponent(editingCommentText)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 200) {
        console.log("댓글 수정 성공:", response.status);
        // 댓글 목록을 다시 가져와서 상태 업데이트
        const updatedPost = await axios.get(
          `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}`
        );
        if (updatedPost.status === 200) {
          setComments(updatedPost.data.commentsResponse || []);
        }
      }
    } catch (error) {
      console.error("댓글 수정 중 오류:", error);
    }
  };

  // 대댓글 수정 핸들러 추가
  const handleEditReply = async (parentCommentId, replyId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.patch(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/comment/${parentCommentId}/reply/${replyId}/edit?content=${encodeURIComponent(editingCommentText)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 200) {
        console.log("대댓글 수정 성공:", response.status);
        // 댓글 목록을 다시 가져와서 상태 업데이트
        const updatedPost = await axios.get(
          `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}`
        );
        if (updatedPost.status === 200) {
          setComments(updatedPost.data.commentsResponse || []);
        }
      }
    } catch (error) {
      console.error("대댓글 수정 중 오류:", error);
    }
  };

  // 대댓글 수정 버튼 클릭 핸들러 추가
  const handleEditReplyButtonClick = (parentCommentId, replyId, content) => {
    setIsEditingCommentId(replyId); // 수정할 대댓글 ID 설정
    setEditingCommentText(content); // 수정할 대댓글 내용 설정
  };

  // 대댓글 수정 완료 핸들러
  const handleEditReplySubmit = async (parentCommentId, replyId) => {
    await handleEditReply(parentCommentId, replyId); // API 요청
    setIsEditingCommentId(null); // 수정 모드 종료
    setEditingCommentText(''); // 입력 필드 초기화
  };

  if (isLoading) {
    return (
      <div className='container'>
        <CommunitySideNav />
        <div>
          <p className='loading' style={{ display: 'none' }}></p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='container'>
        <CommunitySideNav />
        <div>
          <p className='post-none'>해당 게시글을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const createMarkup = (htmlContent) => {
    if (!post?.files) return { __html: htmlContent };
    
    let modifiedContent = htmlContent;
    post.files.forEach(file => {
      modifiedContent = modifiedContent.replace(/blob:[^"]+/g, file.url);
    });
    
    return { __html: DOMPurify.sanitize(modifiedContent) };
  };

  return (
    <div className='container'>
      {post.category === 'STUDY' ? (
        <CommunityStudySideNav /> // STUDY 카테고리일 때 다른 사이드 네비게이션
      ) : (
        <CommunitySideNav /> // 기본 사이드 네비게이션
      )}
      <main style={{ marginLeft: '20px' }}>
        <div className='freecommunity-title'>
          {post.title}
        </div>
        <div className='writer'>
          <span id='post-name'>{post.name}</span>
        </div>
        <div className='interests-show'>
            {post.interests && post.interests.length > 0 && post.interests.map((interest, index) => {
              const interestDataItem = interestData.find(item => item.name === interest.areaName); // name으로 찾기
              return (
                <span key={index} className='interest-item'>
                  {interestDataItem && (
                    <>
                      <img src={interestDataItem.icon} alt={interestDataItem.name} style={{ width: '10px', height: '10px', marginRight: '5px' }} />
                      {interestDataItem.name}
                      {index < post.interests.length - 1 ? <span style={{ marginLeft: '10px' }} /> : ' '}
                    </>
                  )}
                </span>
              );
            })}
        </div>
        <div className='write-info'>
          <span className='write-time'> 작성일 {post.time}</span> |
          <span className='view-record'> 조회수 {post.view}</span>
          <span id='delete-article-button'>
            {post.name === userNickname && ( // 작성자 닉네임과 비교
              <button 
                onClick={() => setIsDeleteModalOpen(true)} // 모달 열기
                className='delete-article-button'
              >
                삭제
              </button>
            )}
          </span>
          <span id='patch-article-button'>
            {post.name === userNickname && ( // 작성자 닉네임과 비교
              <button 
                onClick={() => navigate(`/edit-form/${postId}`)} // 수정 페이지로 이동
                className='delete-article-button'
              >
                수정
              </button>
            )}
          </span>
          <span className='report'>
            <button className='report-button' onClick={() => setIsReportModalOpen(true)}>🚨</button>
          </span>
          <span className='heart'>
            <button className='heart-button' onClick={handleToggleLike}>
              {liked ? <img src={thumbed} alt='thumbed' style={{width: '13px', height: '14px'}}/> : <img src={thumb} alt='thumb' style={{width: '13px', height: '14px'}}/>} {/* 하트 상태에 따라 변경 */}
            </button>
          </span>
        </div>
        <hr className='hr-for-post' />
        <div className='content-free'>
          {post.imageUrl && (
            <div className="post-image-container">
              <img 
                src={post.imageUrl} 
                alt="게시글 이미지" 
                className="post-image"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  marginBottom: '20px'
                }}
              />
            </div>
          )}
          <div dangerouslySetInnerHTML={createMarkup(post.content)} />
        </div>
        <hr className='hr-for-reply' />
        
        <div className="comments-section">
          {/* 댓글 입력 영역 */}
          <div className="comment-input-container">
            <h3>댓글</h3>
            <input
              type="text"
              placeholder="댓글을 입력하세요"
              value={commentText}
              onChange={(e) => setCommentText(filterEmoji(e.target.value))}
              className="comment-input text-input"
              maxLength={255}
            />
            <button className="comment-button" onClick={handleComment} style={{ marginBottom: '20px' }}>
              작성하기
            </button>
          </div>

          {/* 댓글 및 대댓글 목록 */}
          {comments.map((comment) => (
            <div key={comment.commentId} className="comment-item">
              <div className="comment-content" style={{ border: '1px solid #e0e0e0', borderRadius: '10px', width: '80.5%', marginTop: '10px', marginBottom: '20px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img 
                    src={comment.commentAuthorResponse.profile || profileImage} // 프로필 이미지가 없으면 기본 이미지 사용
                    alt="프로필 이미지" 
                    className="comment-profile-image"
                    style={{ marginRight: '10px' }} // 이미지와 텍스트 간격 조정
                  />
                  <span>{comment.commentAuthorResponse.nickname}</span>
                </div>
                {isEditingCommentId === comment.commentId ? ( // 수정 모드일 때
                  <input
                    type="text"
                    value={editingCommentText} // 수정할 댓글 내용을 입력란에 표시
                    onChange={(e) => setEditingCommentText(filterEmoji(e.target.value))}
                    className="edit-comment-input"
                    maxLength={255}
                  />
                ) : ( // 수정 모드가 아닐 때
                  <p style={{ display: 'inline', marginLeft: '30px' }}>{comment.content}</p>
                )}
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button className='report-button' onClick={() => {
                    setCommentToReportId(comment.commentId); // 댓글 ID 설정
                    setIsCommentReportModalOpen(true); // 모달 열기
                  }}>🚨</button>
                  <button className='heart-button' onClick={() => {
                    handleCommentToggleLike(comment.commentId);
                    setCommentLiked(prev => ({ ...prev, [comment.commentId]: !prev[comment.commentId] })); // UI 즉시 업데이트
                  }}>
                    {commentLiked[comment.commentId] ? <img src={thumbed} alt='thumbed' style={{width: '13px', height: '14px'}}/> : <img src={thumb} alt='thumb' style={{width: '13px', height: '14px'}}/>} {/* 하트 상태에 따라 변경 */}
                  </button>
                  <button 
                    onClick={() => handleReplyToggle(comment.commentId)}
                    className="reply-button"
                  >
                    답글달기
                  </button>
                  {comment.commentAuthorResponse.nickname === userNickname && ( // 작성자 닉네임과 비교
                    <>
                      {isEditingCommentId === comment.commentId ? ( // 수정 모드일 때
                        <button 
                          onClick={() => handleEditCommentSubmit(comment.commentId)} // 수정 완료 버튼 클릭 시
                          className="delete-comment-button"
                        >
                          수정 완료
                        </button>
                      ) : ( // 수정 모드가 아닐 때
                        <button 
                          onClick={() => handleEditButtonClick(comment.commentId, comment.content)} // 수정 버튼 클릭 시
                          className="delete-comment-button"
                        >
                          수정
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteComment(comment.commentId)}
                        className="delete-comment-button"
                        style={{ marginLeft: '10px' }} // 버튼 간격 조정
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* 대댓글 입력 영역 */}
              {selectedCommentId === comment.commentId && (
                <div className="reply-input-container">
                  <input
                    type="text"
                    placeholder="답글을 입력하세요"
                    value={replyText}
                    onChange={(e) => setReplyText(filterEmoji(e.target.value))}
                    className="reply-input"
                    maxLength={255}
                  />
                  <div className='reply-submit-container'>
                    <button 
                      onClick={() => handleReply(comment.commentId)}
                      className="reply-submit-button"
                    >
                      답글 작성
                    </button>
                  </div>
                </div>
              )}

              {/* 대댓글 목록 */}
              {comment.child && comment.child.length > 0 && comment.child.map((reply) => (
                <div key={reply.commentId} className="comment-item" style={{ border: '1px solid #e0e0e0', borderRadius: '10px', width: '70.5%', marginLeft: '136px', marginTop: '-15px', marginBottom: '20px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={reply.commentAuthorResponse.profile || profileImage} // 프로필 이미지가 없으면 기본 이미지 사용
                      alt="프로필 이미지" 
                      className="profile-image"
                      style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                    />
                    <span>{reply.commentAuthorResponse.nickname}</span>
                  </div>
                  {isEditingCommentId === reply.commentId ? ( // 수정 모드일 때
                    <input
                      type="text"
                      value={editingCommentText} // 수정할 대댓글 내용을 입력란에 표시
                      onChange={(e) => setEditingCommentText(filterEmoji(e.target.value))}
                      className="edit-comment-input"
                      maxLength={255}
                    />
                  ) : ( // 수정 모드가 아닐 때
                    <p style={{ display: 'inline', marginLeft: '30px' }}><span style={{color: 'lightgray'}}>└</span> {reply.content}</p>
                  )}
                  <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button className='report-button' onClick={() => openReplyReportModal(comment.commentId, reply.commentId)}>🚨</button>
                    <button className='heart-button' onClick={() => {
                      handleReplyToggleLike(comment.commentId, reply.commentId);
                      setReplyLiked(prev => ({ ...prev, [reply.commentId]: !prev[reply.commentId] })); // UI 즉시 업데이트
                    }}>
                      {replyLiked[reply.commentId] ? <img src={thumbed} alt='thumbed' style={{width: '13px', height: '14px'}}/> : <img src={thumb} alt='thumb' style={{width: '13px', height: '14px'}}/>} {/* 하트 상태에 따라 변경 */}
                    </button>
                    {reply.commentAuthorResponse.nickname === userNickname && ( // 대댓글 작성자 닉네임과 비교
                      <>
                        {isEditingCommentId === reply.commentId ? ( // 수정 모드일 때
                          <button 
                            onClick={() => handleEditReplySubmit(comment.commentId, reply.commentId)} // 수정 완료 버튼 클릭 시
                            className="delete-comment-button"
                          >
                            수정 완료
                          </button>
                        ) : ( // 수정 모드가 아닐 때
                          <button 
                            onClick={() => handleEditReplyButtonClick(comment.commentId, reply.commentId, reply.content)} // 수정 버튼 클릭 시
                            className="delete-comment-button"
                          >
                            수정
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteReply(comment.commentId, reply.commentId)}
                          className="delete-comment-button"
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
      <Modal
        isOpen={isReportModalOpen}
        onRequestClose={() => setIsReportModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        <div className="report-options">
          {reportReasons.map((reason) => (
            <div style={{ marginBottom: '9px' }}>
            <label key={reason.value} className="report-option">
              <input
                type="radio"
                name="reportReason"
                value={reason.value}
                checked={reportReason === reason.value}
                onChange={(e) => setReportReason(e.target.value)}
              />
              {reason.label}
            </label>
            </div>
          ))}
        </div>
        <textarea
          placeholder="추가 설명을 입력해주세요"
          value={reportDescription}
          onChange={(e) => setReportDescription(e.target.value)}
          className="report-description"
        />
        <div className="report-buttons">
          <button onClick={() => setIsReportModalOpen(false)} className='modal-report-cancel-button'>취소</button>
          <button onClick={handleReport} disabled={!reportReason} className='modal-report-button'>신고하기</button>
        </div>
      </Modal>
      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={() => setIsSuccessModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }
        }}
      >
        <p>신고가 접수되었습니다.</p>
        <div className='modal-report-success-button-container'>
          <button 
            onClick={() => setIsSuccessModalOpen(false)}
            className='modal-report-success-button'
          >
            확인
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        <p>정말 삭제하시겠습니까?</p>
        <div className="report-buttons">
          <button onClick={() => setIsDeleteModalOpen(false)} className='modal-report-cancel-button'>아니오</button>
          <button onClick={confirmDeleteArticle} className='modal-report-button'>예</button>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteSuccessModalOpen}
        onRequestClose={() => setIsDeleteSuccessModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        <p>삭제가 완료되었습니다.</p>
        <div className="report-buttons">
          <button onClick={() => handleConfirmDelete()} className='modal-report-success-button'>확인</button>
        </div>
      </Modal>
      <Modal
        isOpen={isCommentReportModalOpen}
        onRequestClose={() => setIsCommentReportModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        <div className="report-options">
          {reportReasons.map((reason) => (
            <div style={{ marginBottom: '9px' }} key={reason.value}>
              <label className="report-option">
                <input
                  type="radio"
                  name="reportReason"
                  value={reason.value}
                  checked={reportReason === reason.value}
                  onChange={(e) => setReportReason(e.target.value)}
                />
                {reason.label}
              </label>
            </div>
          ))}
        </div>
        <textarea
          placeholder="추가 설명을 입력해주세요"
          value={reportDescription}
          onChange={(e) => setReportDescription(e.target.value)}
          className="report-description"
        />
        <div className="report-buttons">
          <button onClick={() => setIsCommentReportModalOpen(false)} className='modal-report-cancel-button'>취소</button>
          <button onClick={() => handleCommentReport(commentToReportId)} disabled={!reportReason} className='modal-report-button'>신고하기</button>
        </div>
      </Modal>
      <Modal
        isOpen={isReplyReportModalOpen}
        onRequestClose={() => setIsReplyReportModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        <div className="report-options">
          {reportReasons.map((reason) => (
            <div style={{ marginBottom: '9px' }} key={reason.value}>
              <label className="report-option">
                <input
                  type="radio"
                  name="reportReason"
                  value={reason.value}
                  checked={reportReason === reason.value}
                  onChange={(e) => setReportReason(e.target.value)}
                />
                {reason.label}
              </label>
            </div>
          ))}
        </div>
        <textarea
          placeholder="추가 설명을 입력해주세요"
          value={reportDescription}
          onChange={(e) => setReportDescription(e.target.value)}
          className="report-description"
        />
        <div className="report-buttons">
          <button onClick={() => setIsReplyReportModalOpen(false)} className='modal-report-cancel-button'>취소</button>
          <button onClick={handleReplyReport} disabled={!reportReason} className='modal-report-button'>신고하기</button>
        </div>
      </Modal>
    </div>
  );
}

export default PostDetail;

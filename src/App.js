import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyPage from './components/MyPage/MyPage';
import CommunityFree from './components/Community/CommunityFree';
import CommunityGroup from './components/Community/CommunityGroup';
import CommunityStudy from './components/Community/CommunityStudy';
import Written from './components/Community/Written';
import CommunityQuestion from './components/Community/CommunityQuestion';
import MyPageStudy from './components/MyPage/MyPageStudy';
import MyPageQuestion from './components/MyPage/MyPageQuestion';
import MyPageFree from './components/MyPage/MyPageFree';
import EditNotification from './components/MyPage/EditNotification';
import Interest from './components/MyPage/Interest';
import Notification from './components/MyPage/Notification';
import LoginPopup from './components/MyPage/LoginPopup';
import FindPassword from './components/MyPage/FindPassword';
import SignUp from './components/MyPage/SignUp';
import Home from './components/Main/Home';
import Notice from './components/StudyGroup/Notice';
import ResetPassword from './components/MyPage/ResetPassword';
import NoticeDetails from './components/StudyGroup/NoticeDetails';
import StudyGroup from './components/StudyGroup/StudyGroup';
import Calender from './components/StudyGroup/Calendar'
import { AuthProvider } from './components/ReusableComponents/AuthContext';
import Header from './components/ReusableComponents/Header';
import Footer from './components/ReusableComponents/Footer';
import FAQ from './components/ReusableComponents/FAQ'; 
import FreePostForm from './components/Community/FreePostForm';
import EditForm from './components/Community/EditForm';
import QuestionPostForm from './components/Community/QuestionPostForm';
import StudyPostForm from './components/Community/StudyPostForm';
import PostDetail from './components/Community/PostDetail';
import { SelectedChannelProvider } from './SelectedChannelContext';


function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "첫번째 게시글", content: "게시글 내용", name: "박범준", time: "2024-10-18", like: 10, view: 100, reply: 5 },
    { id: 2, title: "두번째 게시글", content: "게시글 내용", name: "홍길동", time: "2024-10-19", like: 8, view: 80, reply: 3 },
    // 추가적인 게시글들...
  ]);

  

  return(
  <AuthProvider>
  <BrowserRouter>
  <SelectedChannelProvider>
    <Header/>
    <div className='App'>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/free/post-form' element={<FreePostForm/>}/>
      <Route path='/edit-form/:postId' element={<EditForm />} />
      <Route path='/question/post-form' element={<QuestionPostForm/>}/>
      <Route path='/study/post-form' element={<StudyPostForm/>}/>
      <Route path='/login-popup' element={<LoginPopup/>}/>
      <Route path='/mypage' element={<MyPage/>}/>
      <Route path='/mypage-free' element={<MyPageFree/>}/>
      <Route path='/mypage-question' element={<MyPageQuestion/>}/>
      <Route path='/mypage-study' element={<MyPageStudy/>}/>
      <Route path='/find-password' element={<FindPassword/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/written' element={<Written/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/edit-notification' element={<EditNotification/>}/>
      <Route path='/notification' element={<Notification/>}/>
      <Route path='/free' element={<CommunityFree/>}/>
      <Route path='/study' element={<CommunityStudy/>}/>
      <Route path='/group' element={<CommunityGroup/>}/>
      <Route path='/interest' element={<Interest/>}/> 
      <Route path='/question' element={<CommunityQuestion/>}/>
       {/*브라우저에서 path에 따라 element가 렌더링된다*/ }
      <Route path='/StudyGroup' element={<StudyGroup />} />
      <Route path='/StudyGroup/Calendar' element={<Calender />} />
      <Route path='/StudyGroup/Notice' element={<Notice />} />  {/*공지사항 목록 페이지*/}
      <Route path='/StudyGroup/NoticeDetails' element={<NoticeDetails />} />  {/*공지사항 세부내용 페이지*/}
      <Route path="/free" element={<CommunityFree posts={posts} />} />
      <Route path="/post/:postId" element={<PostDetail posts={posts} />} /> {/* PostDetail로 이동 */}
      </Routes>
    </div>
    <Footer />
    <FAQ></FAQ>
    </SelectedChannelProvider>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App; 
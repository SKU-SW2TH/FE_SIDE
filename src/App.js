import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyPage from './components/MyPage/MyPage';
import CommunityFree from './components/Community/CommunityFree';
import CommunityGathering from './components/Community/CommunityGathering';
import CommunityQuestion from './components/Community/CommunityQuestion';
import MyPageStudy from './components/MyPage/MyPageStudy';
import MyPageQuestion from './components/MyPage/MyPageQuestion';
import MyPageFree from './components/MyPage/MyPageFree';
import EditNotification from './components/MyPage/EditNotification';
import LoginPopup from './components/MyPage/LoginPopup';
import FindPassword from './components/MyPage/FindPassword';
import SignUp from './components/MyPage/SignUp';
import EditEmail from './components/MyPage/EditEmail';
import WriteIntroduce from './components/MyPage/WriteIntroduce';
import Home from './components/Main/Home';
import Notice from './components/StudyGroup/Notice';
import NoticeDetails from './components/StudyGroup/NoticeDetails';
import StudyGroup from './components/StudyGroup/StudyGroup';
import Calender from './components/StudyGroup/Calendar'
import Header from './components/ReusableComponents/Header';
import Footer from './components/ReusableComponents/Footer';
import FAQ from './components/ReusableComponents/FAQ'; 
import FreePostForm from './components/Community/FreePostForm';
import QuestionPostForm from './components/Community/QuestionPostForm';
import PostDetail from './components/Community/PostDetail';
import PostForm from './components/Community/PostForm';
import { SelectedChannelProvider } from './SelectedChannelContext';


function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "첫번째 게시글", content: "게시글 내용", name: "박범준", time: "2024-10-18", like: 10, view: 100, reply: 5 },
    { id: 2, title: "두번째 게시글", content: "게시글 내용", name: "홍길동", time: "2024-10-19", like: 8, view: 80, reply: 3 },
    // 추가적인 게시글들...
  ]);


  return(
  <BrowserRouter>
  <SelectedChannelProvider>
    <Header/>
    <div className='App'>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/free/post-form' element={<FreePostForm/>}/>
      <Route path='/question/post-form' element={<QuestionPostForm/>}/>
      <Route path='/login-popup' element={<LoginPopup/>}/>
      <Route path='/mypage' element={<MyPage/>}/>
      <Route path='/mypage-free' element={<MyPageFree/>}/>
      <Route path='/mypage-question' element={<MyPageQuestion/>}/>
      <Route path='/mypage-study' element={<MyPageStudy/>}/>
      <Route path='/find-password' element={<FindPassword/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/edit-notification' element={<EditNotification/>}/>
      <Route path='/free' element={<CommunityFree/>}/>
      <Route path='/gathering' element={<CommunityGathering/>}/>  
      <Route path='/question' element={<CommunityQuestion/>}/>
      <Route path='/edit-email' element={<EditEmail/>}/>
      <Route path='/write-introduce' element={<WriteIntroduce/>}/>
       {/*브라우저에서 path에 따라 element가 렌더링된다*/ }
      <Route path='/StudyGroup' element={<StudyGroup />} />
      <Route path='/StudyGroup/Calendar' element={<Calender />} />
      <Route path='/StudyGroup/Notice' element={<Notice />} />  {/*공지사항 목록 페이지*/}
      <Route path='/StudyGroup/NoticeDetails' element={<NoticeDetails />} />  {/*공지사항 세부내용 페이지*/}
      <Route path="/free" element={<CommunityFree posts={posts} />} />
      <Route path="/post/:postId" element={<PostDetail posts={posts} />} /> {/* PostDetail로 이동 */}
      <Route path="/create" element={<PostForm posts={posts} setPosts={setPosts} />} /> {/* 글쓰기 */}
      </Routes>
    </div>
    <Footer />
    <FAQ></FAQ>
    </SelectedChannelProvider>
    </BrowserRouter>
  );
}

export default App; 
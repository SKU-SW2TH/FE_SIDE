import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyPage from './components/MyPage/MyPage';
import CommunityFree from './components/Community/CommunityFree';
import CommunityGathering from './components/Community/CommunityGathering';
import CommunityQuestion from './components/Community/CommunityQuestion';
import EditProfile from './components/MyPage/EditProfile';
import MyPageFriend from './components/MyPage/MyPageFriend';
import MyPageStudy from './components/MyPage/MyPageStudy';
import MyPageQuestion from './components/MyPage/MyPageQuestion';
import MyPageFree from './components/MyPage/MyPageFree';
import EditNotification from './components/MyPage/EditNotification';
import LoginPopup from './components/MyPage/LoginPopup';
import FindPassword from './components/MyPage/FindPassword';
import FindEmail from './components/MyPage/FindEmail';
import SignUp from './components/MyPage/SignUp';
import ProfileEditIn from './components/MyPage/ProfileEditIn';
import EditEmail from './components/MyPage/EditEmail';
import WriteIntroduce from './components/MyPage/WriteIntroduce';
import Home from './components/Main/Home';
import Notice from './components/StudyGroup/Notice';
import NoticeDetails from './components/StudyGroup/NoticeDetails';
import StudyGroupChat from './components/StudyGroup/StudyGroupChat';
import Calender from './components/StudyGroup/Calendar'
import Header from './components/ReusableComponents/Header';
import Footer from './components/ReusableComponents/Footer';
import FAQ from './components/ReusableComponents/FAQ'; 
import DailyLog from './components/StudyGroup/DailyLogPage';
import { SelectedChannelProvider } from './SelectedChannelContext';


function App() {
  return(
  <BrowserRouter>
  <SelectedChannelProvider>
    <Header/>
    <div className='App'>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login-popup' element={<LoginPopup/>}/>
      <Route path='/mypage' element={<MyPage/>}/>
      <Route path='/mypage-free' element={<MyPageFree/>}/>
      <Route path='/mypage-friend' element={<MyPageFriend/>}/>
      <Route path='/mypage-question' element={<MyPageQuestion/>}/>
      <Route path='/mypage-study' element={<MyPageStudy/>}/>
      <Route path='/edit-profile' element={<EditProfile/>}/>
      <Route path='/find-password' element={<FindPassword/>}/>
      <Route path='/find-email' element={<FindEmail/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/edit-notification' element={<EditNotification/>}/>
      <Route path='/free' element={<CommunityFree/>}/>
      <Route path='/gathering' element={<CommunityGathering/>}/>  
      <Route path='/question' element={<CommunityQuestion/>}/>
      <Route path='/profile-edit-in' element={<ProfileEditIn/>}/>
      <Route path='/edit-email' element={<EditEmail/>}/>
      <Route path='/write-introduce' element={<WriteIntroduce/>}/>
      <Route path='/StudyGroup/Chat' element={<StudyGroupChat />} />
      <Route path='/StudyGroup/Calendar' element={<Calender />} />
      <Route path='/StudyGroup/Notice' element={<Notice />} />  {/*공지사항 목록 페이지*/}
      <Route path='/StudyGroup/NoticeDetails' element={<NoticeDetails />} />  {/*공지사항 세부내용 페이지*/}
      <Route path='/StudyGroup/DailyLog' element={<DailyLog />} />
      </Routes>
    </div>
    <Footer />
    <FAQ></FAQ>
    </SelectedChannelProvider>
    </BrowserRouter>
  );
}

export default App;
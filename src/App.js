import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './component/Main';
import MyPage from './component/MyPage';
import Nav from './component/Nav';
import CommunityFree from './component/CommunityFree';
import CommunityGathering from './component/CommunityGathering';
import CommunityQuestion from './component/CommunityQuestion';
import EditProfile from './component/EditProfile';
import MyPageFriend from './component/MyPageFriend';
import MyPageStudy from './component/MyPageStudy';
import MyPageQuestion from './component/MyPageQuestion';
import MyPageFree from './component/MyPageFree';
import EditNotification from './component/EditNotification';
import LoginPopup from './component/LoginPopup';
import FindPassword from './component/FindPassword';
import FindEmail from './component/FindEmail';
import SignUp from './component/SignUp';
import ProfileEditIn from './component/ProfileEditIn';
import EditEmail from './component/EditEmail';
import WriteIntroduce from './component/WriteIntroduce';


function App() {
  return(
    <BrowserRouter>
    <div className='App'>
      <Nav/>
      <Routes>
      <Route path='/' element={<Main/>}/>
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
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
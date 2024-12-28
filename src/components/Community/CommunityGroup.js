import React, { useEffect, useState } from 'react';
import "../../styles/StudyGroupMake.css";
import CommunityStudySideNav from "./CommunityStudySideNav";
import DOMPurify from 'dompurify';
import axios from 'axios';
import styled from 'styled-components';
import Modal from 'react-modal';
import CommunityCategoryModal from './CommunityCategoryModal';

const InterestsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const InterestTag = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const InterestIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const InterestLabel = styled.span`
  margin-right: 8px;
`;

const RemoveButton = styled.span`
  color: #666;
  cursor: pointer;
  font-size: 18px;
  
  &:hover {
    color: black;
  }
`;

const CommunityGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [nicknameSearch, setNicknameSearch] = useState('');
  const [searchedNicknames, setSearchedNicknames] = useState([]);
  const [selectedNicknames, setSelectedNicknames] = useState([]);
  const [leaderNickname, setLeaderNickname] = useState('');
  const [groups, setGroups] = useState([]);
  const [interests, setInterests] = useState([]);
  const [isInterestsModalOpen, setIsInterestsModalOpen] = useState(false);

  const initializeStudyGroup = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/studyGroup/joinedList`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.status === 200) {
        console.log("그룹 생성 성공:", response.data);
        setIsModalOpen(false);
        setGroups(response.data);
      }
    } catch (error) {
      console.error("그룹 생성 실패:", error);
    }
  };

  // interestData 객체 추가
  const interestData = {
    5: { name: 'React', icon: require('../../assets/images/react.svg').default },
    6: { name: 'Angular', icon: require('../../assets/images/angular.svg').default },
    7: { name: 'Vue.js', icon: require('../../assets/images/vuedotjs.svg').default },
    8: { name: 'Svelte', icon: require('../../assets/images/svelte.svg').default },
    9: { name: 'jQuery', icon: require('../../assets/images/jquery.svg').default },
    10: { name: 'Backbone.js', icon: require('../../assets/images/backbonedotjs.svg').default },
    11: { name: 'Preact', icon: require('../../assets/images/preact.svg').default },
    12: { name: 'Ember.js', icon: require('../../assets/images/emberdotjs.svg').default },
    13: { name: 'Node.js', icon: require('../../assets/images/nodedotjs.svg').default },
    14: { name: 'Spring', icon: require('../../assets/images/spring.svg').default },
    15: { name: 'Spring-Boot', icon: require('../../assets/images/springboot.svg').default },
    16: { name: 'Django', icon: require('../../assets/images/django.svg').default },
    17: { name: 'Flask', icon: require('../../assets/images/flask.svg').default },
    18: { name: 'Laravel', icon: require('../../assets/images/laravel.svg').default },
    19: { name: 'Ruby on Rails', icon: require('../../assets/images/rubyonrails.svg').default },
    20: { name: 'CakePHP', icon: require('../../assets/images/cakephp.svg').default },
    21: { name: 'Java', icon: require('../../assets/images/java.svg').default },
    22: { name: 'Python', icon: require('../../assets/images/python.svg').default },
    23: { name: 'C', icon: require('../../assets/images/c.svg').default },
    24: { name: 'C++', icon: require('../../assets/images/cplusplus.svg').default },
    25: { name: 'JavaScript', icon: require('../../assets/images/javascript.svg').default },
    26: { name: 'Go', icon: require('../../assets/images/go.svg').default },
    27: { name: 'PHP', icon: require('../../assets/images/php.svg').default },
    28: { name: 'Ruby', icon: require('../../assets/images/ruby.svg').default },
    29: { name: 'Kotlin', icon: require('../../assets/images/kotlin.svg').default },
    30: { name: 'Swift', icon: require('../../assets/images/swift.svg').default }
  };

  const handleInterestChange = (selectedItems) => {
    setInterests(selectedItems);
  };

  const removeInterest = (interestToRemove) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  useEffect(() => {
    initializeStudyGroup();
  }, []);

  const createGroup = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log(searchedNicknames);
      const response = await axios.post(`http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/studyGroup/create?groupName=${groupName}&description=${groupDescription}&selectedNicknames=${JSON.stringify(searchedNicknames)}&leaderNickname=${leaderNickname}&areaIds=${JSON.stringify(interests)}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.status === 201) {
        console.log("그룹 생성 성공:", response.data);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("그룹 생성 실패:", error);
    }
  };

  const searchNicknames = async () => {

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/studyGroup/searchMembers?nickname=${nicknameSearch}&page=0&size=5`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
      });
      setSearchedNicknames(response.data);
    } catch (error) {
      console.error("닉네임 검색 실패:", error);
    }
  };

  const handleNicknameChange = (nickname) => {
    setSelectedNicknames(prev => 
      prev.includes(nickname) ? prev.filter(n => n !== nickname) : [...prev, nickname]
    );
  };

  const handleNavigateToGroup = (groupId) => {
    console.log(`그룹 ${groupId}로 이동`);
  };

  return (
    <div className='container'>
      <CommunityStudySideNav/>
      <div>
        <p className='community-title'>나의 그룹</p>

        <div className='group-cards'>
          {groups.slice(0, 4).map((group) => (
            <div key={group.groupId} className='group-card'>
              <h3>{group.groupName}</h3>
              <p>관심 분야: {group.areas.join(', ') || '없음'}</p>
              <p>소개: {group.description}</p>
              <p>멤버 수: {group.memberCount}</p>
              <button onClick={() => handleNavigateToGroup(group.groupId)}>➡️ 이동</button>
            </div>
          ))}
        </div>
        <div className='group-cards'>
          {groups.slice(4, 8).map((group) => (
            <div key={group.groupId} className='group-card'>
              <h3>{group.groupName}</h3>
              <p>관심 분야: {group.areas.join(', ') || '없음'}</p>
              <p>소개: {group.description}</p>
              <p>멤버 수: {group.memberCount}</p>
              <button onClick={() => handleNavigateToGroup(group.groupId)}>➡️ 이동</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="fixed-button">
        <button className='group-button' onClick={() => setIsModalOpen(true)}>그룹 생성</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#fff',
            height: '900px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <h2 className='group-title'>그룹 생성</h2>
        <div className='group-name'>
          <input 
            type="text" 
            placeholder="그룹 이름" 
            value={groupName} 
            id='group-name'
            onChange={(e) => setGroupName(e.target.value)} 
          />
        </div>
        <div className='group-introduce'>
          <textarea 
            placeholder="그룹 소개" 
            value={groupDescription} 
            id='group-introduce'
            onChange={(e) => setGroupDescription(e.target.value)} 
          />
        </div>
        <div className='search-nickname'>
          <input 
            type="text" 
            placeholder="닉네임 검색" 
            value={nicknameSearch} 
            id='search-nickname'
            onChange={(e) => setNicknameSearch(e.target.value)} 
          />
          <button onClick={searchNicknames} id='make-button'>검색</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div className='nickname-invite'>
            {searchedNicknames.map((nickname) => (
              <div key={nickname}>
                <input 
                  type="checkbox" 
                  checked={selectedNicknames.includes(nickname)}
                  onChange={() => handleNicknameChange(nickname)}
                />
                <span onClick={() => handleNicknameChange(nickname)}>{nickname}</span>
              </div>
            ))}
          </div>
          <div className='selected-nickname'>
            초대 명단: {selectedNicknames.length > 0 ? selectedNicknames.join('\n') : '없음'}
          </div>
        </div>
        <div className='group-boss'>
          <input 
            type="text" 
            placeholder="그룹장 닉네임" 
            value={leaderNickname} 
            id='group-boss'
            onChange={(e) => setLeaderNickname(e.target.value)} 
          />
        </div>
        <div>
          <button 
              type="button" 
              onClick={() => setIsInterestsModalOpen(true)}
              className="interest-selection-button"
          >
              관심분야 선택
          </button>
          <InterestsContainer>
              {interests.map((interest, index) => {
                  const interestItem = Object.values(interestData).find(item => item.name === interest);
                  return (
                      <InterestTag key={index}>
                          {interestItem && (
                              <InterestIcon 
                                  src={interestItem.icon} 
                                  alt={interest} 
                              />
                          )}
                          <InterestLabel>{interest}</InterestLabel>
                          <RemoveButton onClick={() => removeInterest(interest)}>×</RemoveButton>
                      </InterestTag>
                  );
              })}
          </InterestsContainer>
        </div>
        <div className='modal-footer'>
          <button onClick={() => {
              setIsModalOpen(false);
              setGroupName('');
              setGroupDescription('');
              setNicknameSearch('');
              setSelectedNicknames([]);
              setInterests([]);
              setLeaderNickname('');
          }} className='group-cancel-button'>취소</button>
          <button onClick={createGroup} className='group-confirm-button'>확인</button>
        </div>
      </Modal>
      <CommunityCategoryModal
                    isOpen={isInterestsModalOpen}
                    onClose={() => setIsInterestsModalOpen(false)}
                    onSelectionChange={handleInterestChange}
      />
    </div>
  );
};

export default CommunityGroup; 
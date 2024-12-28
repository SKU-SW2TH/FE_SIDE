import React from 'react';
import styled from 'styled-components';

// 스타일 정의
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 165px); /* 각 아이템의 너비를 170px로 고정 */
  gap: 16px; /* 항목 간의 간격 */
  margin-top: 20px;
  overflow: hidden; /* 내용이 넘치는 경우 숨기기 */
`;

const InterestItem = styled.div`
  display: flex;
  align-items: center;
  position: relative; /* X 버튼의 위치를 위해 relative 설정 */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0; /* 호버 시 배경색 변경 */
  }
`;

const InterestIcon = styled.img`
  width: 24px; /* 아이콘 크기 조정 */
  height: 24px;
  margin-right: 8px;
`;

const InterestLabel = styled.span`
  margin-right: 8px; /* X 버튼과의 간격 */
  transition: margin-left 0.3s; /* 체크 표시가 숨겨질 때 부드럽게 이동 */
`;

const Checkmark = styled.span`
  color: green;
  font-size: 20px; /* 체크 표시 크기 조정 */
  margin-right: 8px;
  transition: opacity 0.3s, margin-left 0.3s; /* 위치 이동과 투명도 전환 */

  /* 호버 시 체크 표시 숨기기 */
  ${InterestItem}:hover & {
    opacity: 0; /* 호버 시 체크 표시 사라짐 */
    margin-left: -13px; /* 체크 표시가 사라질 때 글자를 더 왼쪽으로 이동 */
  }
`;

const RemoveButton = styled.span`
  color: black;
  cursor: pointer;
  font-size: 20px;
  position: absolute; /* 호버 시 나타날 수 있도록 절대 위치 설정 */
  right: 8px; /* 오른쪽 끝에 위치 */
  opacity: 0; /* 기본적으로 보이지 않음 */
  transition: opacity 0.3s;

  ${InterestItem}:hover & {
    opacity: 1; /* 호버 시 나타남 */
  }
`;

const SelectedInterest = ({ selectedInterests, onRemoveInterest }) => {
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
    15: { name: 'SpringBoot', icon: require('../../assets/images/springboot.svg').default },
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

  return (
    <GridContainer>
      {selectedInterests.map((interestId) => (
        <InterestItem key={interestId}>
          <Checkmark>✓</Checkmark>
          <InterestIcon 
            src={interestData[interestId].icon} 
            alt={interestData[interestId].name} 
          />
          <InterestLabel>{interestData[interestId].name}</InterestLabel>
          <RemoveButton onClick={() => onRemoveInterest(interestId)}>⨉</RemoveButton>
        </InterestItem>
      ))}
    </GridContainer>
  );
};

export default SelectedInterest;

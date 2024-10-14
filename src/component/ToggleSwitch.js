import React, { useState } from 'react';

function ToggleSwitch() {
  // 토글 상태 (true: On, false: Off)
  const [isOn, setIsOn] = useState(false);

  // 토글 상태 변경 함수
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div>
      <button 
        onClick={toggleSwitch} 
        style={{
          padding: '10px 20px',
          backgroundColor: isOn ? '#52c771' : 'gray', 
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer'
        }}
      >
        {isOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}

export default ToggleSwitch;

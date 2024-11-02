import React, { useState } from 'react';
import '../../styles/ToggleSwitch.css';

function ToggleSwitch() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleSwitch;

import React from 'react';
import '../../styles/ToggleSwitch.css';

function ToggleSwitch({ isToggled, onToggle }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleSwitch;

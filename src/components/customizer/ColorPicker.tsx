import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="color-picker-container">
      <div className="color-picker-section">
        <h3 className="color-picker-title">Bottle Color</h3>
        <p className="color-picker-description">Choose the color for your bottle and cap</p>
        
        <div className="color-picker-wrapper">
          <input 
            type="color" 
            value={snap.color}
            onChange={(e) => state.color = e.target.value}
            className="w-full h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
          />
        </div>
        
        <div className="current-color-display flex items-center gap-2 mt-4">
          <div 
            className="w-6 h-6 rounded-full border-2 border-gray-300" 
            style={{ backgroundColor: snap.color }}
          ></div>
          <span className="text-sm font-medium text-gray-700">{snap.color}</span>
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
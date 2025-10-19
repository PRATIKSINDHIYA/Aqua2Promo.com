import React from 'react';
import { useSnapshot } from 'valtio';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

import state from '../../store';

const LogoControls = () => {
  const snap = useSnapshot(state);

  const handlePositionChange = (type: 'front' | 'back', index: number, value: number) => {
    if (type === 'front') {
      const newPosition = [...snap.frontLogoPosition];
      newPosition[index] = value;
      state.frontLogoPosition = newPosition;
    } else if (type === 'back') {
      const newPosition = [...snap.backLogoPosition];
      newPosition[index] = value;
      state.backLogoPosition = newPosition;
    }
  };

  const handleScaleChange = (type: 'front' | 'back', value: number) => {
    if (type === 'front') {
      state.frontLogoScale = [value, value, value];
    } else if (type === 'back') {
      state.backLogoScale = [value, value, value];
    }
  };

  return (
    <div className="logo-controls-container space-y-6">
      {/* Front Logo Section */}
      <div className="logo-section">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Front Logo</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Position X:</label>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('front', 0, snap.frontLogoPosition[0] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.frontLogoPosition[0].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('front', 0, snap.frontLogoPosition[0] + 0.01)}
              >
                +
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Position Y:</label>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('front', 1, snap.frontLogoPosition[1] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.frontLogoPosition[1].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('front', 1, snap.frontLogoPosition[1] + 0.01)}
              >
                +
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Position Z:</label>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('front', 2, snap.frontLogoPosition[2] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.frontLogoPosition[2].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('front', 2, snap.frontLogoPosition[2] + 0.01)}
              >
                +
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Scale:</label>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleScaleChange('front', snap.frontLogoScale[0] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.frontLogoScale[0].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleScaleChange('front', snap.frontLogoScale[0] + 0.01)}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Back Logo Section */}
      <div className="logo-section">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Back Logo</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Position X:</label>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('back', 0, snap.backLogoPosition[0] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.backLogoPosition[0].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('back', 0, snap.backLogoPosition[0] + 0.01)}
              >
                +
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Position Y:</label>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('back', 1, snap.backLogoPosition[1] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.backLogoPosition[1].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('back', 1, snap.backLogoPosition[1] + 0.01)}
              >
                +
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Position Z:</label>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('back', 2, snap.backLogoPosition[2] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.backLogoPosition[2].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('back', 2, snap.backLogoPosition[2] + 0.01)}
              >
                +
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Scale:</label>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleScaleChange('back', snap.backLogoScale[0] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.backLogoScale[0].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleScaleChange('back', snap.backLogoScale[0] + 0.01)}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoControls;
import React from 'react';
import { useSnapshot } from 'valtio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import state from '../../store';

const fonts = [
  "Arial",
  "Times New Roman",
  "Segoe UI",
  "Tahoma",
  "Calibri",
  "Frutiger",
  "Helvetica",
  "Futura PT",
  "Myriad Pro",
  "Open Sans",
  "Roboto",
  "Verdana",
  "Adobe Arabic",
  "Droid Arabic Naskh",
  "GE SS Unique Light",
  "Simplon Norm Arabic",
  "Neue Helvetica Arabic",
  "Noto Naskh Arabic",
  "Ubuntu Arabic",
  "Waseem",
  "Zuhair",
  "Dubai",
  "Amiri",
  "Bukra",
  "Bahij Nazanin",
  "Kufam",
  "Lalezar",
  "Mirza",
  "Sakkal Majalla",
  "Scheherazade",
  "Tajawal",
  "Lateef",
  "Reem Kufi",
  "Almarai",
  "Cairo",
  "Harmattan",
  "Janna LT",
  "Mada",
  "Muna",
  "JF Flat",
  "JF Hitham",
  "JF Nizar",
  "JF Deco",
  "JF Ziba",
  "JF Unicode Naskh",
  "JF Typist",
  "JF Flat Arabic",
  "JF Nizar Serif",
  "JF Zaytoon",
  "JF Zuhair",
  "JF Deco Arabic",
  "JF Hujjat",
  "JF Noon",
  "JF Raya",
  "JF Riqa",
  "JF Tulisan",
  "JF Adeeb",
  "JF Zarkan",
  "JF Besmellah",
  "JF Noori Nastaleeq",
  "JF Noori Nastaleeq Kasheeda",
  "JF Noori Nastaleeq V1.0",
  "JF Noori Nastaleeq V2.0",
  "JF Noori Nastaleeq V3.0",
  "JF Noori Nastaleeq V4.0",
  "JF Noori Nastaleeq V5.0",
  "JF Noori Nastaleeq V6.0",
  "JF Noori Nastaleeq V7.0",
  "JF Noori Nastaleeq V8.0",
  "JF Noori Nastaleeq V9.0",
  "JF Noori Nastaleeq V10.0",
  "JF Noori Nastaleeq V11.0",
  "JF Noori Nastaleeq V12.0",
  "JF Noori Nastaleeq V13.0",
  "JF Noori Nastaleeq V14.0"
];

const TextControls = () => {
  const snap = useSnapshot(state);

  const handleTextChange = (type: 'front' | 'back', value: string) => {
    if (type === 'front') {
      state.frontText = value;
    } else if (type === 'back') {
      state.backText = value;
    }
  };

  const handlePositionChange = (type: 'front' | 'back', index: number, value: number) => {
    if (type === 'front') {
      const newPosition = [...snap.frontTextPosition];
      newPosition[index] = value;
      state.frontTextPosition = newPosition;
    } else if (type === 'back') {
      const newPosition = [...snap.backTextPosition];
      newPosition[index] = value;
      state.backTextPosition = newPosition;
    }
  };

  const handleRotationChange = (type: 'front' | 'back', index: number, value: number) => {
    if (type === 'front') {
      const newRotation = [...snap.frontTextRotation];
      newRotation[index] = value;
      state.frontTextRotation = newRotation;
    } else if (type === 'back') {
      const newRotation = [...snap.backTextRotation];
      newRotation[index] = value;
      state.backTextRotation = newRotation;
    }
  };

  const handleScaleChange = (type: 'front' | 'back', index: number, value: number) => {
    if (type === 'front') {
      const newScale = [...snap.frontTextScale];
      newScale[index] = value;
      state.frontTextScale = newScale;
    } else if (type === 'back') {
      const newScale = [...snap.backTextScale];
      newScale[index] = value;
      state.backTextScale = newScale;
    }
  };

  const handleFontChange = (type: 'front' | 'back', value: string) => {
    if (type === 'front') {
      state.frontTextFont = value;
    } else if (type === 'back') {
      state.backTextFont = value;
    }
  };

  const handleColorChange = (type: 'front' | 'back', value: string) => {
    if (type === 'front') {
      state.frontTextColor = value;
    } else if (type === 'back') {
      state.backTextColor = value;
    }
  };

  return (
    <div className="text-controls-container space-y-8">
      {/* Front Text Section */}
      <div className="text-section">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Front Text</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Text:</label>
            <Input
              type="text"
              value={snap.frontText}
              onChange={(event) => handleTextChange('front', event.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Position X:</label>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('front', 0, snap.frontTextPosition[0] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.frontTextPosition[0].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('front', 0, snap.frontTextPosition[0] + 0.01)}
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
                onClick={() => handlePositionChange('front', 1, snap.frontTextPosition[1] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.frontTextPosition[1].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('front', 1, snap.frontTextPosition[1] + 0.01)}
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
                onClick={() => handlePositionChange('front', 2, snap.frontTextPosition[2] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.frontTextPosition[2].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('front', 2, snap.frontTextPosition[2] + 0.01)}
              >
                +
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Font:</label>
            <Select 
              value={snap.frontTextFont} 
              onValueChange={(value) => handleFontChange('front', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Color:</label>
            <div className="flex items-center gap-2 mt-1">
              <input 
                type="color" 
                value={snap.frontTextColor}
                onChange={(e) => handleColorChange('front', e.target.value)}
                className="w-12 h-8 rounded border-2 border-gray-300 cursor-pointer"
              />
              <span className="text-sm font-mono">{snap.frontTextColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Text Section */}
      <div className="text-section">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Back Text</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Text:</label>
            <Input
              type="text"
              value={snap.backText}
              onChange={(event) => handleTextChange('back', event.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Position X:</label>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('back', 0, snap.backTextPosition[0] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.backTextPosition[0].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('back', 0, snap.backTextPosition[0] + 0.01)}
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
                onClick={() => handlePositionChange('back', 1, snap.backTextPosition[1] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.backTextPosition[1].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('back', 1, snap.backTextPosition[1] + 0.01)}
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
                onClick={() => handlePositionChange('back', 2, snap.backTextPosition[2] - 0.01)}
              >
                -
              </Button>
              <span className="text-sm font-mono w-16 text-center">
                {snap.backTextPosition[2].toFixed(2)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handlePositionChange('back', 2, snap.backTextPosition[2] + 0.01)}
              >
                +
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Font:</label>
            <Select 
              value={snap.backTextFont} 
              onValueChange={(value) => handleFontChange('back', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Color:</label>
            <div className="flex items-center gap-2 mt-1">
              <input 
                type="color" 
                value={snap.backTextColor}
                onChange={(e) => handleColorChange('back', e.target.value)}
                className="w-12 h-8 rounded border-2 border-gray-300 cursor-pointer"
              />
              <span className="text-sm font-mono">{snap.backTextColor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextControls;
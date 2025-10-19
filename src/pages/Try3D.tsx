import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

import state from '../store';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';

// Import customizer components
import ColorPicker from '../components/customizer/ColorPicker';
import DesignUploader from '../components/customizer/DesignUploader';
import LogoControls from '../components/customizer/LogoControls';
import TextControls from '../components/customizer/TextControls';
import Tab from '../components/customizer/Tab';
import Bottle from '../components/customizer/Bottle';
import CameraRig from '../components/customizer/CameraRig';

const Try3D = () => {
  const snap = useSnapshot(state);

  // Set intro to false to show customizer controls
  React.useEffect(() => {
    state.intro = false;
  }, []);

  const [file, setFile] = useState<File | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState<string>("");
  const [activeFilterTab, setActiveFilterTab] = useState<{[key: string]: boolean}>({
    downloadBottle: false,
  });

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "designuploader":
        return <DesignUploader
          onFrontDesignUpload={handleFrontDesignUpload}
          onBackDesignUpload={handleBackDesignUpload}
        />;
      case "logocontrols":
        return <LogoControls />;
      case "textcontrols":
        return <TextControls />;
      default:
        return null;
    }
  };

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "downloadBottle":
        downloadCanvasToImage();
        break;
      default:
        break;
    }
  };

  const handleFrontDesignUpload = (file: File) => {
    reader(file)
      .then((result) => {
        state.frontLogoDecal = result;
        state.isFrontLogoTexture = true; // Ensure front logo texture is enabled
        console.log('Front design uploaded:', result); // Debug log
        setActiveEditorTab("");
      })
      .catch((error) => {
        console.error('Error uploading front design:', error);
      });
  };

  const handleBackDesignUpload = (file: File) => {
    reader(file)
      .then((result) => {
        state.backLogoDecal = result;
        state.isBackLogoTexture = true; // Enable back logo texture
        console.log('Back design uploaded:', result); // Debug log
        console.log('Back logo texture enabled:', state.isBackLogoTexture); // Debug log
        setActiveEditorTab("");
      })
      .catch((error) => {
        console.error('Error uploading back design:', error);
      });
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-x-hidden"
      style={{
        scrollBehavior: 'smooth',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💧</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">3D Bottle Customizer</h1>
                <p className="text-sm text-gray-600">Design your perfect water bottle</p>
              </div>
              </div>
            <div className="flex items-center space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => state.intro = true}
                className="hidden sm:flex"
              >
                🔙 Back to Intro
              </Button>
              <Button 
                onClick={() => downloadCanvasToImage()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                📥 Download
                </Button>
              </div>
          </div>
        </div>
      </header>

      {/* Intro Screen */}
      {snap.intro && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50">
          <Card className="w-96 text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">3D Bottle Customizer</CardTitle>
              <p className="text-gray-600">Design your custom water bottle with our 3D configurator</p>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => state.intro = false}
                size="lg"
                className="w-full"
              >
                Start Customizing
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Layout - Responsive */}
      {!snap.intro && (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left Side - 3D Bottle Preview Box (Responsive) */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">💧</span>
                  3D Live Preview
                </h2>
                <p className="text-blue-100 text-sm mt-2">Move mouse to rotate • Click to interact</p>
              </div>
              <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
                <div className="w-full max-w-md sm:max-w-xl h-96 sm:h-[28rem] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border-2 border-blue-200 shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-blue-100/30 pointer-events-none z-10"></div>
                  <Canvas
                    camera={{ position: [0, 0, 3], fov: 45 }}
                    gl={{
                      preserveDrawingBuffer: false,
                      antialias: false,
                      alpha: true,
                      powerPreference: "high-performance",
                      stencil: false,
                      depth: true
                    }}
                    className="w-full h-full"
                    shadows={false}
                    dpr={[1, 1.5]}
                    onError={(error) => console.error('Canvas error:', error)}
                    onCreated={({ gl }) => {
                      gl.setClearColor('#f0f9ff', 1);
                      gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                    }}
                  >
                    <Suspense fallback={null}>
                      {/* Optimized Background */}
                      <mesh position={[0, 0, -10]}>
                        <planeGeometry args={[40, 30]} />
                        <meshBasicMaterial color="#5E90A4" />
                      </mesh>
                      
                      {/* Environment reflections for bottle */}
                      <Environment preset="studio" background={false} />
                      
                      {/* Atmospheric fog */}
                      <fog attach="fog" args={['#f0f9ff', 8, 20]} />
                      
                      {/* Simple Ground Plane */}
                      <mesh 
                        rotation={[-Math.PI / 2, 0, 0]} 
                        position={[0, -1.5, 0]}
                      >
                        <planeGeometry args={[20, 20]} />
                        <meshBasicMaterial color="#f8fafc" />
                      </mesh>
                      
                      {/* Optimized Lighting */}
                      <ambientLight intensity={0.6} color="#ffffff" />
                      
                      {/* Main directional light */}
                      <directionalLight
                        position={[5, 5, 5]}
                        intensity={1.5}
                        color="#ffffff"
                      />
                      
                      {/* Single fill light */}
                      <pointLight position={[-3, 3, 3]} intensity={0.4} color="#ffffff" />
                      
                      {/* Right Top Corner Light */}
                      {snap.isRightTopLight && (
                        <pointLight 
                          position={[3, 3, 3]} 
                          intensity={1.0} 
                          color="#ffffff"
                          castShadow
                        />
                      )}

                      <CameraRig>
                        <Bottle />
                      </CameraRig>
                    </Suspense>
                  </Canvas>
                </div>
              </div>
              
                      {/* Preview Status */}
                      <div className="p-6 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between text-base text-gray-700 mb-3">
                          <span className="font-medium">🎨 Color: {snap.color}</span>
                          <span className="font-medium">✨ {snap.isRightTopLight ? 'Enhanced' : 'Standard'} Lighting</span>
                        </div>
                        <div className="text-sm text-gray-600 text-center mb-3">
                          Real-time 3D preview with interactive controls
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              // Rotate bottle to show front (0 degrees)
                              if ((window as any).rotateBottle) {
                                (window as any).rotateBottle(0);
                              }
                            }}
                            className="text-xs"
                          >
                            🔄 Front View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              // Rotate bottle to show back (180 degrees)
                              if ((window as any).rotateBottle) {
                                (window as any).rotateBottle(Math.PI);
                              }
                            }}
                            className="text-xs"
                          >
                            🔄 Back View
                          </Button>
                        </div>
                      </div>
            </div>

              {/* Right Side - Main Content (Responsive) */}
              <div className="lg:col-span-3">
              <div 
                className="max-w-4xl mx-auto"
                style={{
                  scrollBehavior: 'smooth',
                  willChange: 'transform'
                }}
              >
                {/* Hero Section */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    Live 3D Customizer
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Design Your Dream Bottle
                  </h1>
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                    Create stunning personalized water bottles with our advanced 3D configurator.
                  </p>
                </div>

                {/* Customization Tools */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">🛠️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Customization Tools</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {EditorTabs.map((tab) => (
                      <Button
                        key={tab.name}
                        variant={activeEditorTab === tab.name ? "default" : "outline"}
                        onClick={() => setActiveEditorTab(activeEditorTab === tab.name ? "" : tab.name)}
                        className="flex items-center gap-2 h-12 text-sm font-medium transition-all duration-200 hover:scale-105"
                      >
                        <img src={tab.icon} alt={tab.name} className="w-5 h-5" />
                        <span className="capitalize">{tab.name.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </Button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  {activeEditorTab && (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                        {generateTabContent()}
                      </div>
                    </div>
                  )}
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 mb-1">Colors</h3>
                    <p className="text-xs text-gray-600">Unlimited options</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📱</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 mb-1">Upload</h3>
                    <p className="text-xs text-gray-600">Your designs</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">💧</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 mb-1">3D Preview</h3>
                    <p className="text-xs text-gray-600">Real-time</p>
                  </div>
                </div>

                {/* Controls */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">⚙️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Controls</h2>
                  </div>
                  
                  {/* Light Controls */}
                  <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                    <div>
                      <Label htmlFor="light-toggle" className="text-lg font-semibold text-gray-800">
                        ✨ Enhanced Lighting
                      </Label>
                      <p className="text-sm text-gray-600">Professional lighting effects</p>
                    </div>
                    <Switch
                      id="light-toggle"
                      checked={snap.isRightTopLight}
                      onCheckedChange={(checked) => state.isRightTopLight = checked}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      onClick={() => downloadCanvasToImage()}
                      className="h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <span className="mr-2">📥</span>
                      Download
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => state.intro = true}
                      className="h-12 text-base font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                    >
                      <span className="mr-2">🔙</span>
                      Back
                    </Button>
                  </div>
                </div>

                {/* Footer */}
                <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-4">Ready to Create Your Custom Bottle?</h3>
                    <p className="text-gray-300 mb-6">
                      Use the tools above to design your perfect water bottle. Upload your logo, choose colors, and see your design come to life in real-time!
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Button 
                        onClick={() => downloadCanvasToImage()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                      >
                        📥 Download Your Design
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => state.intro = true}
                        className="border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg font-semibold"
                      >
                        🔙 Start Over
                      </Button>
                    </div>
                  </div>
                   </footer>
                 </div>
               </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Try3D;
import React from 'react';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { Decal, OrbitControls } from '@react-three/drei';
import state from '../../store';

const SimpleBottle = () => {
  const snap = useSnapshot(state);

  const createTextTexture = (text: string, font: string, size: number, color: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();
    
    ctx.font = `${size}px ${font}`;
    const textWidth = ctx.measureText(text).width;
    canvas.width = textWidth;
    canvas.height = size;
    ctx.fillStyle = color;
    ctx.font = `${size}px ${font}`;
    ctx.fillText(text, 0, size);
    return new THREE.CanvasTexture(canvas);
  };

  return (
    <>
      <OrbitControls />
      <group>
        {/* Main bottle body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.2, 1, 32]} />
          <meshLambertMaterial color={snap.color} />
          
          {/* Full texture decal */}
          {snap.isFullTexture && (
            <Decal
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={[1, 1.5, 1]}
              map={new THREE.TextureLoader().load(snap.fullDecal)}
              depthTest={false}
              depthWrite={true}
            />
          )}

          {/* Front logo decal */}
          {snap.isFrontLogoTexture && (
            <Decal
              position={snap.frontLogoPosition}
              rotation={[0, 0, 0]}
              scale={snap.frontLogoScale}
              map={new THREE.TextureLoader().load(snap.frontLogoDecal)}
              depthTest={false}
              depthWrite={true}
            />
          )}
          
          {/* Front text decal */}
          {snap.isFrontText && (
            <Decal
              position={snap.frontTextPosition}
              rotation={snap.frontTextRotation}
              scale={snap.frontTextScale}
              map={createTextTexture(snap.frontText, snap.frontTextFont, snap.frontTextSize, snap.frontTextColor)}
              depthTest={false}
              depthWrite={true}
            />
          )}

          {/* Back logo decal */}
          {snap.isBackLogoTexture && (
            <Decal
              position={snap.backLogoPosition}
              rotation={snap.backLogoRotation}
              scale={snap.backLogoScale}
              map={new THREE.TextureLoader().load(snap.backLogoDecal)}
              depthTest={false}
              depthWrite={true}
            />
          )}
          
          {/* Back text decal */}
          {snap.isBackText && (
            <Decal
              position={snap.backTextPosition}
              rotation={snap.backTextRotation}
              scale={snap.backTextScale}
              map={createTextTexture(snap.backText, snap.backTextFont, snap.backTextSize, snap.backTextColor)}
              depthTest={false}
              depthWrite={true}
            />
          )}
        </mesh>

        {/* Bottle cap */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshLambertMaterial color={snap.color} />
        </mesh>
      </group>
    </>
  );
};

export default SimpleBottle;
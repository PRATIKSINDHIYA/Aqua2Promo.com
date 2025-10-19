import React from 'react'
import * as THREE from 'three';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../../store';

const Bottle = () => {
  const snap = useSnapshot(state);
  const groupRef = React.useRef<THREE.Group>(null);
  const [rotationY, setRotationY] = React.useState(0);
  
  // Add method to rotate bottle programmatically
  React.useEffect(() => {
    (window as any).rotateBottle = (angle: number) => {
      if (groupRef.current) {
        groupRef.current.rotation.y = angle;
        setRotationY(angle);
      }
    };
  }, []);
  
  // Load the bottle model
  const { nodes, materials } = useGLTF('/bottle.glb');

  // Load textures with high quality settings
  const logoTexture = useTexture(snap.frontLogoDecal || '/threejs.png', (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = 16;
  });
  
  const fullTexture = useTexture(snap.fullDecal || '/texture.jpeg', (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = 16;
  });
  
  const backLogoTexture = useTexture(snap.backLogoDecal || '/threejs.png', (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = 16;
  });
  
  console.log('Texture loading status:');
  console.log('Front logo texture:', logoTexture);
  console.log('Back logo texture:', backLogoTexture);
  console.log('Full texture:', fullTexture);

  const createTextTexture = (text: string, font: string, size: number, color: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();
    
    // High resolution for better quality
    const scale = 5; // 4x resolution for crisp text
    const scaledSize = size * scale;
    
    ctx.font = `${scaledSize}px ${font}`;
    const textWidth = ctx.measureText(text).width;
    
    canvas.width = textWidth;
    canvas.height = scaledSize;
    
    // Enable high quality text rendering
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    ctx.fillStyle = color;
    ctx.font = `${scaledSize}px ${font}`;
    ctx.fillText(text, 0, 0);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.anisotropy = 16;
    
    return texture;
  }

  // Find all available geometries and materials
  const allNodes = Object.values(nodes || {}).filter(node => node && node.geometry);
  const allMaterials = Object.values(materials || {});
  
  console.log('Bottle model loaded successfully!');
  console.log('Available nodes:', allNodes.length);
  console.log('Available materials:', allMaterials.length);
  console.log('Current state:', snap);
  console.log('Back logo texture enabled:', snap.isBackLogoTexture);
  console.log('Back logo decal:', snap.backLogoDecal);

  // Apply color animation to materials and handle rotation
  useFrame((state, delta) => {
    if (allMaterials && allMaterials.length > 0) {
      allMaterials.forEach(material => {
        if (material && material.color) {
          easing.dampC(material.color, snap.color, 0.25, delta);
        }
      });
    }
    
    // Handle ultra-smooth mouse rotation with advanced easing
    if (groupRef.current) {
      const targetRotation = (state.mouse.x * 0.9) * Math.PI;
      const currentRotation = groupRef.current.rotation.y;
      
      // Ultra-smooth interpolation with frame-rate independent easing
      const easingFactor = Math.min(0.15, delta * 8); // Frame-rate independent
      const smoothedRotation = currentRotation + (targetRotation - currentRotation) * easingFactor;
      groupRef.current.rotation.y = smoothedRotation;
      setRotationY(smoothedRotation);
    }
  });

  const stateString = JSON.stringify(snap);

  // Fallback bottle if model doesn't load
  if (allNodes.length === 0) {
    return (
      <group ref={groupRef} key={stateString} position={[0, -0.4, 0]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.3, 2, 16]} />
          <meshStandardMaterial color={snap.color} />
        </mesh>
      </group>
    );
  }

  return (
    <>
      <group ref={groupRef} key={stateString} position={[0, -1.5, -0.2]}>
        {allNodes.map((node, index) => {
          const material = allMaterials[index] || allMaterials[0];
          if (!node.geometry || !material) return null;
          
          return (
            <mesh
              key={index}
              geometry={node.geometry}
              material={material}
              dispose={null}
              castShadow
              receiveShadow
            >
              {snap.isFullTexture && fullTexture && (
                <Decal
                  position={[0, 0.6, 0]}
                  rotation={[0, 0, 0]}
                  scale={[1, 1.5, 1]}
                  map={fullTexture}
                  depthTest={false}
                  depthWrite={true}
                  polygonOffset={true}
                  polygonOffsetFactor={-4}
                />
              )}

              {snap.isFrontLogoTexture && logoTexture && (
                <Decal
                  position={snap.frontLogoPosition}
                  rotation={[0, 0, 0]}
                  scale={snap.frontLogoScale}
                  map={logoTexture}
                  depthTest={false}
                  depthWrite={true}
                  polygonOffset={true}
                  polygonOffsetFactor={-4}
                />
              )}
              
              {snap.isFrontText && (
                <Decal
                  position={snap.frontTextPosition}
                  rotation={snap.frontTextRotation}
                  scale={snap.frontTextScale}
                  map={createTextTexture(snap.frontText, snap.frontTextFont, snap.frontTextSize, snap.frontTextColor)}
                  depthTest={false}
                  depthWrite={true}
                  polygonOffset={true}
                  polygonOffsetFactor={-4}
                />
              )}

              {snap.isBackLogoTexture && backLogoTexture && (
                <Decal
                  position={snap.backLogoPosition}
                  rotation={snap.backLogoRotation}
                  scale={snap.backLogoScale}
                  map={backLogoTexture}
                  depthTest={false}
                  depthWrite={true}
                  polygonOffset={true}
                  polygonOffsetFactor={-4}
                />
              )}
              
              {snap.isBackText && (
                <Decal
                  position={snap.backTextPosition}
                  rotation={snap.backTextRotation}
                  scale={snap.backTextScale}
                  map={createTextTexture(snap.backText, snap.backTextFont, snap.backTextSize, snap.backTextColor)}
                  depthTest={false}
                  depthWrite={true}
                  polygonOffset={true}
                  polygonOffsetFactor={-4}
                />
              )}
            </mesh>
          );
        })}
      </group>
    </>
  );
}

export default Bottle
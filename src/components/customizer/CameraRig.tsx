import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

interface CameraRigProps {
  children: React.ReactNode;
}

const CameraRig = ({ children }: CameraRigProps) => {
  const { camera } = useThree();

  useEffect(() => {
    // Fixed camera position for better bottle centering and zoom
    const targetPosition: [number, number, number] = [0, 0, 3];
    camera.position.set(...targetPosition);
    camera.lookAt(0, -0.3, 0);
  }, [camera]);

  return <>{children}</>;
};

export default CameraRig;
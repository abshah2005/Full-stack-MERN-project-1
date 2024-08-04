import React from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const modelViewer = ({ ModelUrl }) => {
    const { scene } = useGLTF(modelUrl);
  return (
    <Canvas
    style={{ width: '100%', height: '100%' }}
    camera={{ position: [0, 0, 2], fov: 50 }}
  >
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <primitive object={scene} />
    <OrbitControls enableZoom={false} />
  </Canvas>
  )
}

export default modelViewer

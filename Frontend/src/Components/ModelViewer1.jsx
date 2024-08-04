import React from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const ModelViewer1 = ({ ModelUrl }) => {
    const { scene } = useGLTF(ModelUrl);
  return (
//     <Canvas
//     style={{zIndex: 1, width: '100%', height: '100%' }}
//     camera={{ position: [0, 0, 2], fov: 50 }}
//   >
//     <ambientLight intensity={0.5} />
//     <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//     <primitive object={scene} />
//     <OrbitControls enableZoom={false} />
//   </Canvas>

<div
      style={{ width: '100%', height: '100%' }}
      onPointerDown={(e) => e.stopPropagation()} // Stop propagation for Canvas
    >
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 0, 2], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <primitive object={scene} />
        <OrbitControls enableZoom={false} enablePan={true} />
      </Canvas>
    </div>
  )
}

export default ModelViewer1

import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import ModelSofa from "./ModelSofa";

import { useMediaQuery } from "react-responsive";


const Sofaim = () => {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  let sofaScale, sofaPosition;

  if (isLargeScreen) {
    sofaScale = [2, 2, 2];
    sofaPosition = [0, -0.1, 0];
  } else if (isMediumScreen) {
    sofaScale = [2, 2, 2];
    sofaPosition = [0, -0.1, 0];
  } else if (isSmallScreen) {
    sofaScale = [1.5, 1.5, 1.5];
    sofaPosition = [0, 0, 0];
  }
  return (
    <Canvas className='flex items-center ' camera={{ position: [0, 5, 0], fov: 50 }}>
    <Suspense fallback={null}>
      <ambientLight intensity={1} />
      

      <ModelSofa position={sofaPosition} scale={sofaScale} rotation={[0, 1.1, 0]} />
      
      <OrbitControls 
        enableZoom={false} 
        maxPolarAngle={Math.PI / 2} 
        minPolarAngle={Math.PI / 2} 
        enablePan={false} 

      />
    </Suspense>
  </Canvas>
  );
};

export default Sofaim;
import React from 'react'
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader"
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ModelSofa = ({ position, scale,rotation }) => {
    const obj = useLoader(GLTFLoader, "../public/chair.glb");
    // const obj = useLoader(GLTFLoader, "http://res.cloudinary.com/dvmccihlf/image/upload/v1722275923/fmxfmbkidijg3hylgz7t.glb");

    

  return (
   <primitive object={obj.scene} position={position}  rotation={rotation} scale={scale} />
  )
}

export default ModelSofa

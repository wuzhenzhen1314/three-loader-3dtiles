import ReactDOM from 'react-dom'
import { useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { ErrorBoundary } from 'react-hooks-fetch';
import { Matrix4, Euler } from 'three'

import { Loader3DTilesR3FAsset } from './loader-3dtiles-r3f'

import {getProject} from "@theatre/core"
import {editable as e, SheetProvider, extension} from '@theatre/r3f'
import studio from "@theatre/studio"

studio.initialize();
studio.extend(extension)

function App() {
  const camera = useRef(null);

  return (
    <div id="canvas-container">
      <Canvas style={{ background: '#272730'}}>
        <SheetProvider
          getSheet={() => getProject('Playground - R3F').sheet('R3F-Canvas')}
        >
        <e.perspectiveCamera ref={camera} uniqueName="camera">
          <ErrorBoundary fallback={
            <mesh>
              <sphereBufferGeometry />
              <meshBasicMaterial color="red" />
            </mesh>
          }>
            <Suspense fallback={
              <mesh>
                <sphereBufferGeometry />
                <meshBasicMaterial color="yellow" />
              </mesh>
            }>
              <Loader3DTilesR3FAsset
                 rotation={new Euler(-Math.PI / 2, 0, 0)}
                 url="https://int.nyt.com/data/3dscenes/ONA360/TILESET/0731_FREEMAN_ALLEY_10M_A_36x8K__10K-PN_50P_DB/tileset_tileset.json"
                maximumScreenSpaceError={48}
              />
            </Suspense>
          </ErrorBoundary>
        </e.perspectiveCamera>
        <OrbitControls camera={camera.current} />
       </SheetProvider>
      </Canvas>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

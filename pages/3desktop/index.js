import React, { useRef, useState, useEffect } from 'react'
import root from 'react-shadow';
import * as Polyglot from 'node-polyglot'
import { Canvas, useFrame, useThree, Dom } from 'react-three-fiber'
import DragControls from 'three-dragcontrols';
export let Box = React.forwardRef(function Box(props,ref) {
    
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    
    // Rotate mesh every frame, this is outside of React without overhead
    
    return (
      <mesh
        {...props}
        ref={ref}
        scale={(hovered ? [1.5, 1.5, 1.5] : [1, 1, 1]).map(v => v * props.scale)}
        onPointerOver={e => setHover(true)}
        onPointerOut={e => setHover(false)}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1].map(v => v * props.scale)} />
        <meshStandardMaterial attach="material" color={props.color} />
      </mesh>
    )
  })
  let ThreeRef = props => {props.setThree(useThree()); return null};
  let DOMCanvas = props => (<Dom><canvas ref = {props.onCanvas} {...props}></canvas></Dom>)
export default props => {let Desktop = props.dcls;let [three,setThree] = useState(); if(three)var {camera,gl} = three;let [objs,setObjs] = useState(); if(!objs)setObjs([]); useEffect(() => {if(gl){let d = new DragControls(objs,camera,gl.domElements);return d.dispose.bind(d)}},[props.dcls,objs]); return (<Canvas>
 <Desktop Div = {Box} Canvas = {DOMCanvas} Window = {wprops => {let r = useRef();useEffect(() => {setObjs((objs || []).concat([r.current])); return () => setObjs(objs.filter(o => o !== r.current))}); return (<Box {...wprops} ref = {r}></Box>)}} Iframe = {Box}></Desktop>
<ThreeRef setThree = {setThree}></ThreeRef>
</Canvas>)}
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { range } from '../../utils'
// import { playSound, stopPlayingSound } from '../../app/audio-middleware/audio.actions'
// import { selectCurrentMousePos, selectClickedMousePos, updateCurrentMousePos } from '../../app/mouseSlice'
import { selectCurrentMousePos, updateCurrentMousePos } from '../../app/mouseSlice'
import { selectCanvasWidth, selectCanvasHeight } from './mainSlice'
// import { selectZipperClicked, selectZipperPosition } from '../ZipperButton/zipperSlice'
import { selectZipperPosition } from '../ZipperButton/zipperSlice'
import { titles } from '../../app/sounds-info/sounds'
import Canvas from '../../components/Canvas/Canvas'
import ZipperButton from '../ZipperButton/ZipperButton'
import Tooth from '../Tooth/Tooth'
import styles from './Main.module.css'
const numTeeth = titles.length;
// id, startX, startY, c1x, c1y, c2x, c2y, endX, endY




const Main = () => {
    const dispatch = useDispatch()
    const canvasWidth = useSelector(selectCanvasWidth)
    const canvasHeight = useSelector(selectCanvasHeight)
    const currentMousePos = useSelector(selectCurrentMousePos)
    // const clickedMousePos = useSelector(selectClickedMousePos)
    // const clicked = useSelector(selectZipperClicked)
    const { top } = useSelector(selectZipperPosition)
    // console.log(top)
    const [stateTop, setTop ] = useState(top)


    useEffect(() => {

        setTop(top)

    }, [top])



    useEffect(() => {

        const setFromEvent = (e) =>  dispatch(updateCurrentMousePos({x: e.clientX, y: e.clientY}))

        window.addEventListener("mousemove", setFromEvent)
        return () => {
            window.removeEventListener('mousemove', setFromEvent)
        }
    }, [dispatch])
    // onMouseMove={(e) => dispatch(updateCurrentMousePos({x: e.clientX, y: e.clientY}))}


    const center = window.innerWidth/2;
    const offsetY = 300;
    const lineHeight = 50;
    const teeth = Array.from({ length: numTeeth}, (el, i) => new Tooth(i, false, center, offsetY, lineHeight, canvasWidth))
    const reverseTeeth = Array.from({ length: numTeeth}, (el, i) => new Tooth(i, true, center, offsetY, lineHeight, canvasWidth))

    const draw = (ctx, count) => {
        
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        teeth.forEach(tooth => {
            tooth.update(stateTop)
            tooth.render(ctx)
        })
        reverseTeeth.forEach(tooth => {
            tooth.update(stateTop)
            tooth.render(ctx)
        })

    }
    
    return ( 
        <div className={styles.mainContainer} 
           
            // onMouseUp={() => stopZip()}
            >

      
            <Canvas className="wave-canvas" draw={draw} width={canvasWidth} height={canvasHeight}/>
            < ZipperButton currentMousePos={currentMousePos}/>
        </div>
     );
}
 
export default Main;



// <MainSVG canvasWidth={canvasWidth} canvasHeight={canvasHeight}>
// {
//    teeth.map( tooth => {
    
//     const id = `tooth-${tooth.id}`
//     console.log(tooth.path)
//     return (
//         <g key={`tooth-group-${tooth.id}`}> 
//         <path 
//             id={id}
//             d={tooth.path}
//             fill='transparent'
//         />
//         <text style={{width: '100px', height: '100px', fontSize:'20px'}} width={canvasWidth} height={100} x={tooth.pos.x} y={tooth.pos.y} fill="#000">
//         <textPath alignmentBaseline="top" xlinkHref={id}>
//             {tooth.text} this is some more text
//         </textPath>
//         </text>
//         </g>
//     )

//    })
// }

// </MainSVG>
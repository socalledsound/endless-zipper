import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentMousePos, updateCurrentMousePos } from '../../app/mouseSlice'
import { selectCanvasWidth, selectCanvasHeight, selectCanvasTop } from './mainSlice'
import { selectZipperPosition } from '../ZipperButton/zipperSlice'
import { selectTeeth, selectReverseTeeth } from '../teeth/teethSlice'
import Canvas from '../../components/Canvas/Canvas'
import ZipperButton from '../ZipperButton/ZipperButton'
import fabric from '../../assets/fabric.jpg'
import styles from './Main.module.css'


//background image
const image = new Image()
image.src = fabric


const Main = () => {
    const dispatch = useDispatch()
    const mainRef = useRef()
    const teeth = useSelector(selectTeeth)
    const reverseTeeth = useSelector(selectReverseTeeth)
    const canvasWidth = useSelector(selectCanvasWidth)
    const canvasHeight = useSelector(selectCanvasHeight)
    const canvasTop = useSelector(selectCanvasTop)
    const currentMousePos = useSelector(selectCurrentMousePos)   
    const { top } = useSelector(selectZipperPosition)
    const [stateTop, setTop ] = useState(top)


    useEffect(() => {

        setTop(top + 100 - canvasTop)

    }, [top, canvasTop])



    useEffect(() => {

        const setFromEvent = (e) =>  dispatch(updateCurrentMousePos({x: e.clientX, y: e.clientY}))

        window.addEventListener("mousemove", setFromEvent)
        return () => {
            window.removeEventListener('mousemove', setFromEvent)
        }
    }, [dispatch])
    // onMouseMove={(e) => dispatch(updateCurrentMousePos({x: e.clientX, y: e.clientY}))}
    //  console.log(teeth)

    const draw = (ctx, count) => {
        // console.log(teeth)
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // ctx.drawImage(image, 0,0, canvasHeight, canvasWidth)

        teeth.forEach(tooth => {
            tooth.update(stateTop, false)
            tooth.render(ctx)
            // dispatch(updateTeeth())
        })
        reverseTeeth.forEach(tooth => {
            tooth.update(stateTop, false)
            tooth.render(ctx)
            // dispatch(updateReverseTeeth(tooth))
        })

    }
    
    return ( 
        <div 
            className={styles.mainContainer} 
            ref={mainRef}
            // onMouseUp={() => stopZip()}
            >

      
            <Canvas className={styles.canvas} draw={draw} width={canvasWidth} height={canvasHeight + Math.abs(canvasTop)} style={{top: canvasTop}}/>
            < ZipperButton currentMousePos={currentMousePos} mainRef={mainRef} />
            {/* < ZipperButton /> */}
        </div>
     );
}
 
export default Main;


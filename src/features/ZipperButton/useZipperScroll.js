import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import throttle from 'lodash/throttle';
import { selectClickedMousePos } from '../../app/mouseSlice' 
import { updateCanvasTop, selectCanvasTop } from '../main/mainSlice'
import { initLeft, initTop, selectZipperPosition, updateZipperPosition, toggleZipperClicked} from './zipperSlice';
import { selectTeeth } from '../teeth/teethSlice'
import { playSound, stopPlayingSound, updatePitch} from '../../app/audio-middleware/audio.actions'

const timing = (1 / 60) * 1000;

export default function useZipperScroll(mainRef, zipperRef, currentMousePos, circleSize){
    const teeth = useSelector(selectTeeth)
    const { top } = useSelector(selectZipperPosition)
    const  currentCanvasTop = useSelector(selectCanvasTop)
    const clickedMousePos = useSelector(selectClickedMousePos)
    const dispatch = useDispatch()
    const [clicked, toggleClicked ] = useState(false)

    const [zipperPositionY, setZipperPositionY] = useState(top)
    const [isDragging, setIsDragging] = useState(false)
    const [clickStartY, setClickStartY] = useState()
    const [scrollStartY, setScrollStartY] = useState();
    const [direction, setDirection] = useState(0);
    const [lastScrollX, setLastScrollX] = useState(0);
    const [speed, setSpeed] = useState(0);

    // const startZip = useCallback(() =>{
        
    //         console.log('start')
    //         // dispatch(setClickedMousePos({x: e.clientX, y: e.clientY}))
    //         // dispatch(toggleZipperClicked())
    //         //const indexes = range(10) 
    //         // indexes.forEach( idx => dispatch(playSound(idx)))
        
    // })


    const stopZip = useCallback(() => {

            if(clicked){
                dispatch(toggleZipperClicked())
            }
            toggleClicked(false)    
            teeth.forEach(tooth => {
                if(tooth.playing){
                    dispatch(stopPlayingSound(tooth.id))
                    tooth.playing = false
                }
            })  
    }, [teeth, clicked, dispatch])

    const handleLastScrollX = useCallback( () => {
        throttle(screenX => {
            setLastScrollX(screenX)
        }, timing)}, []
    )


    useEffect(() => {
        // window.addEventListener("mouseup", stopZip)
        // return () => {
        //     window.removeEventListener('mouseup', stopZip)
        // }
        if(mainRef.current){
            mainRef.current.onmouseup = stopZip
        }
    })

    useEffect(()=>{
        if(zipperRef.current){
                if(clicked){
                    const delta = (clickStartY - 135) - currentMousePos.y 
                    console.log(delta)
                    let newTopVal = currentMousePos.y - 350
                    console.log(currentCanvasTop)
                    dispatch(updateZipperPosition(newTopVal))
                    if(currentCanvasTop < 10)
                        if(delta < 0){
                            dispatch(updateCanvasTop(delta/50))
                           
                           }else{
                            dispatch(updateCanvasTop(delta/10))  
                           }
                    

                    if(newTopVal > initTop && newTopVal < initTop + 400){
                        setZipperPositionY(newTopVal)
                        dispatch(updateCanvasTop(delta/100)) 
                    }
                    

                    if(Math.abs(delta) > 1){
                        setIsDragging(true)
                        setDirection(delta / Math.abs(delta))
                        setSpeed(Math.abs((lastScrollX - currentMousePos.y) / timing))
                        handleLastScrollX(currentMousePos.y)
                    }


                    teeth.forEach(tooth => {
                        
                        if(tooth.playable && !tooth.playing){
                            dispatch(playSound(tooth.id))
                            tooth.playing = true
                        }

                        if(tooth.playing){
                            dispatch(updatePitch(tooth.id, speed/50))
                        }
                    })


            }
        }    
    }, [zipperRef, clicked, clickedMousePos, currentMousePos, zipperPositionY, clickStartY,scrollStartY, currentCanvasTop, teeth, speed, dispatch, handleLastScrollX, lastScrollX])


    useEffect(() => {
        
        zipperRef.current.style.left = `${initLeft}px`
        zipperRef.current.style.top = `${zipperPositionY}px`
        
    })

    const handleClick = (e) => {
        console.log('clicked')
        e.stopPropagation()
        if(mainRef.current){
            if(zipperRef.current){
                if(!clicked){
                    dispatch(toggleZipperClicked())
                }
                toggleClicked(true)
                setClickStartY(e.screenY)
                setScrollStartY(mainRef.current.scrollTop - 200)
                setDirection(0)
                teeth.forEach(tooth => {
                    if(tooth.playable && !tooth.playing){
                        dispatch(playSound(tooth.id))
                        tooth.playing = true
                    }
                })
            }

        }
    }
    return {clicked, isDragging, direction, speed, handleClick}
}

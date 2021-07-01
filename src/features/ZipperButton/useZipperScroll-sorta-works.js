import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import throttle from 'lodash/throttle';
import { selectCurrentMousePos, selectClickedMousePos } from '../../app/mouseSlice' 
// import { updateCanvasTop } from '../main/mainSlice'
import { initLeft, initTop, selectZipperPosition, updateZipperPosition} from './zipperSlice';

const timing = (1 / 60) * 1000;

export default function useZipperScroll(scrollRef){
    
    const { top } = useSelector(selectZipperPosition)
    const currentMousePos = useSelector(selectCurrentMousePos)
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
            console.log('stop')
            toggleClicked(!clicked)
            // dispatch(toggleZipperClicked())
            //const indexes = range(10) 
            // indexes.forEach( idx => dispatch(stopPlayingSound(idx)))
    }, [clicked])

    const handleLastScrollX = useCallback( () => {
        throttle(screenX => {
            setLastScrollX(screenX)
        }, timing)}, []
    )


    useEffect(() => {
        window.addEventListener("mouseup", stopZip)
        return () => {
            window.removeEventListener('mouseup', stopZip)
        }
    })

    useEffect(()=>{
        
        if(scrollRef.current){
            console.log(clicked)
    
                if(clicked){
                    console.log(currentMousePos.y)
                    let newTopVal = currentMousePos.y - 200
                    // console.log(newTopVal)
                    if(newTopVal > initTop-20){
                        // const moveCanvasAmount = clickedMousePos.y - currentMousePos.y 
                        // scrollRef.current.scrollTop = clickStartY + moveCanvasAmount
                        
                        
                        // console.log(moveCanvasAmount)
                        // dispatch(updateCanvasTop(moveCanvasAmount))
                        if(newTopVal < initTop + 1000){
                            dispatch(updateZipperPosition(newTopVal))
                            setZipperPositionY(newTopVal)
                            // dispatch(updateCanvasTop(moveCanvasAmount))
                        }
                    }
                


            }



    
            // if(scrollRef.current.ontouchstart === undefined){  
            //     // scrollRef.current.onmousemove = handleDragMove;
            // }
        }

        
    }, [scrollRef, clicked, clickedMousePos, currentMousePos, zipperPositionY, clickStartY, dispatch])


    useEffect(() => {
        console.log(zipperPositionY)
        scrollRef.current.style.left = `${initLeft}px`
        scrollRef.current.style.top = `${zipperPositionY}px`
    })



 //             if(clickStartY !== undefined && scrollStartY !== undefined){
    //                 const touchDelta = clickStartY - e.screenX
    //                 scrollRef.current.scrollTop = scrollStartY + touchDelta

    //                 if(Math.abs(touchDelta) > 1){
    //                     setIsDragging(true)
    //                     setDirection(touchDelta / Math.abs(touchDelta))
    //                     setSpeed(Math.abs((lastScrollX - e.screenX) / timing))
    //                     handleLastScrollX(e.screenX)
    //                 }
    //             }


        // scrollRef.current.style.backgroundColor = '#00FF00'



    // useEffect(() => {
    //     if(scrollRef.current){
    //         const handleDragStart = e => {
    //             setClickStartY(e.screenX)
    //             setScrollStartY(scrollRef.current.scrollLeft)
    //             setDirection(0)
    //         }

    //         const handleDragMove = e => {
    //             e.preventDefault()
    //             e.stopPropagation()

    //             if(clickStartY !== undefined && scrollStartY !== undefined){
    //                 const touchDelta = clickStartY - e.screenX
    //                 scrollRef.current.scrollTop = scrollStartY + touchDelta

    //                 if(Math.abs(touchDelta) > 1){
    //                     setIsDragging(true)
    //                     setDirection(touchDelta / Math.abs(touchDelta))
    //                     setSpeed(Math.abs((lastScrollX - e.screenX) / timing))
    //                     handleLastScrollX(e.screenX)
    //                 }
    //             }
    //         }

    //         // const handleDragEnd = () => {
    //         //     if(isDragging && clickStartY !== undefined){
    //         //         setClickStartY(undefined)
    //         //         setScrollStartY(undefined)
    //         //         setIsDragging(false)
    //         //     }
    //         // }

            // if(scrollRef.current.ontouchstart === undefined){
  
            //     scrollRef.current.onmousemove = handleDragMove;

            //     // scrollRef.current.onmouseleave = handleDragEnd;
            // }

    //     }
    // })



    const handleClick = (e) => {
        if(scrollRef.current){
            toggleClicked(!clicked)
            setClickStartY(e.screenY)
            setScrollStartY(scrollRef.current.scrollTop)
            setDirection(0)
        }
    }

    // const handleMouseMove = () => {    


    //     // dispatch(toggleZipperClicked())
    // }


    return {clicked, handleClick}
}






    // useEffect(() => {
        
    //     // console.log(newTopVal)
    //     if(clicked){
    //         let newTopVal = currentMousePos.y - 200
    //         if(newTopVal > initTop){
    //             const moveCanvasAmount = clickedMousePos.y - currentMousePos.y 
    //             console.log(moveCanvasAmount)
    //             // dispatch(updateCanvasTop(moveCanvasAmount))
    //             if(newTopVal < initTop + 200){
    //                 dispatch(updateZipperPosition(newTopVal))
    //                 // dispatch(updateCanvasTop(moveCanvasAmount))
    //             }
                
                
    //         } else {
    //             dispatch(updateZipperPosition(initTop))
    //             // dispatch(updateCanvasTop(moveCanvasAmount))
    //         }
            
    //         // if(currentMousePos.y < initTop){
    //         //     newTopVal = initTop  
    //         // } else {
    //             // dispatch(updateZipperPosition(newTopVal))
    //         }
    // }, [clicked, clickedMousePos, currentMousePos, dispatch])








    // let newTopVal = top;
    // console.log(newTopVal)
    // if(clicked){
    //     newTopVal = currentMousePos.y - 200
        // if(currentMousePos.y < initTop){
        //     newTopVal = initTop  
        // } else {
            // dispatch(updateZipperPosition(newTopVal))
       // }
        // if(newTopVal < initTop){
        //     newTopVal = initTop
        // }

        // console.log(newTopVal)
        // console.log(updateZipperPosition(newTopVal))
        //need to figure out how to do this sort of thing with hooks
        //and maybe sagas
    
     
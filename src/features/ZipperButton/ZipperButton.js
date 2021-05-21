import React, {useEffect} from 'react'
import { range } from '../../utils'
import { playSound, stopPlayingSound } from '../../app/audio-middleware/audio.actions'
import { useSelector, useDispatch  } from 'react-redux'
import { setClickedMousePos } from '../../app/mouseSlice' 
import { toggleZipperClicked, selectZipperCircle, selectZipperClicked, selectZipperPosition, updateZipperPosition } from './zipperSlice';
// import UpDownIcon from '../../icons/UpDownIcon/UpDownIcon'
import styles from './ZipperButton.module.css';




const upDownCircleColor = '#fff0ff'




const ZipperButton = ({currentMousePos}) => {
    

    const dispatch = useDispatch()
    const { x, y, size } = useSelector(selectZipperCircle)
    const clicked = useSelector(selectZipperClicked)
    const {top, left } = useSelector(selectZipperPosition)

    const startZip = (e) => {
        console.log('start')
        dispatch(setClickedMousePos({x: e.clientX, y: e.clientY}))
        dispatch(toggleZipperClicked())
        const indexes = range(10) 
        indexes.forEach( idx => dispatch(playSound(idx)))
        
    }




    useEffect(() => {
        const stopZip = () => {
            console.log('stop')
            dispatch(toggleZipperClicked())
            const indexes = range(10) 
            indexes.forEach( idx => dispatch(stopPlayingSound(idx)))
        }
        // const setFromEvent = (e) =>  dispatch(updateCurrentMousePos({x: e.clientX, y: e.clientY}))

        window.addEventListener("mouseup", stopZip)
        return () => {
            window.removeEventListener('mouseup', stopZip)
        }
    }, [dispatch])



    useEffect(() => {

        // console.log(newTopVal)
        if(clicked){
            const newTopVal = currentMousePos.y - 200
            dispatch(updateZipperPosition(newTopVal))
            // if(currentMousePos.y < initTop){
            //     newTopVal = initTop  
            // } else {
                // dispatch(updateZipperPosition(newTopVal))
            }
    })


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
    
     


    return ( 
        <div className={styles.button} style={{left: `${left}px`, top: `${top}px`}}>
              <svg  viewBox="0 0 200 400">
        
        {/* <circle cx={x} cy={y} r={size} fill="#333"/> */}
        <polygon 
            className="zip-up" 
            points={`${x},${y - size/1.5},${x + size/2},${y-size/8},${x - size/2},${y-size/8}`} 
            fill={upDownCircleColor}
        />

        <polygon 
            className="zip-down" 
            points={`${x},${y + size/1.5},${x + size/2},${y+size/8},${x - size/2},${y+size/8}`} 
            fill={upDownCircleColor}
        />
       <circle cx={x} cy={y} r={size} fill="red" 
            onMouseDown={(e) => startZip(e)}
           
            />

            

    </svg>
        </div>
        
     );
}
 
export default ZipperButton;



import React from 'react'
import { useRef } from 'react'
// import { range } from '../../utils'
// import { useDispatch } from 'react-redux'
// import { setClickedMousePos } from '../../app/mouseSlice' 

// import { toggleZipperClicked } from './zipperSlice' 
import useZipperScroll from './useZipperScroll'
// import UpDownIcon from '../../icons/UpDownIcon/UpDownIcon'
import styles from './ZipperButton.module.css';

const initX = 100
const initY = 200
const circleSize = 100

const circle = {
    x: initX,
    y: initY,
    size: circleSize,
}


const upDownCircleColor = '#fff0ff'




const ZipperButton = ({currentMousePos, mainRef}) => {
    const zipperRef = useRef();
    // const dispatch = useDispatch()

    const {clicked, handleClick} = useZipperScroll(zipperRef, mainRef, currentMousePos, circle.size)



    return ( 
        <div className={styles.button} ref={zipperRef}>
              <svg  viewBox="0 0 200 400">
        
        {/* <circle cx={x} cy={y} r={size} fill="#333"/> */}
        <polygon 
            className="zip-up" 
            points={`${circle.x},${circle.y - circle.size/1.5},${circle.x + circle.size/2},${circle.y-circle.size/8},${circle.x - circle.size/2},${circle.y-circle.size/8}`} 
            fill={upDownCircleColor}
        />

        <polygon 
            className="zip-down" 
            points={`${circle.x},${circle.y + circle.size/1.5},${circle.x + circle.size/2},${circle.y+circle.size/8},${circle.x - circle.size/2},${circle.y+circle.size/8}`} 
            fill={upDownCircleColor}
        />
       <circle 
            cx={circle.x} cy={circle.y} 
            r={clicked ? circle.size-10 : circle.size} 
            fill={clicked ? 'purple' : 'red'} 
            stroke={clicked ? 'red' : 'none'}
            strokeWidth='20px'
            onMouseDown={(e) => handleClick(e)}
            />

            

    </svg>
        </div>
        
     );
}
 
export default ZipperButton;



import React from 'react'
import { useRef } from 'react'
import useZipperScroll from './useZipperScroll'
import styles from './ZipperButton.module.css';
import { controlCircle } from '../../globalSettings' 

const ZipperButton = ({currentMousePos, mainRef}) => {

    const zipperRef = useRef();
    //the main event here is in the custom hook
    const {clicked, handleClick} = useZipperScroll(mainRef,zipperRef, currentMousePos, controlCircle.size)

    return ( 
        <div className={styles.button} ref={zipperRef}>
              <svg  viewBox="0 0 200 400">
        
        {/* <controlCircle cx={x} cy={y} r={size} fill="#333"/> */}
        <polygon 
            className="zip-up" 
            points={`${controlCircle.x},${controlCircle.y - controlCircle.size/1.5},${controlCircle.x + controlCircle.size/2},${controlCircle.y-controlCircle.size/8},${controlCircle.x - controlCircle.size/2},${controlCircle.y-controlCircle.size/8}`} 
            fill={controlCircle.color}
        />

        <polygon 
            className="zip-down" 
            points={`${controlCircle.x},${controlCircle.y + controlCircle.size/1.5},${controlCircle.x + controlCircle.size/2},${controlCircle.y+controlCircle.size/8},${controlCircle.x - controlCircle.size/2},${controlCircle.y+controlCircle.size/8}`} 
            fill={controlCircle.color}
        />
       <circle 
            cx={controlCircle.x} cy={controlCircle.y} 
            r={clicked ? controlCircle.size-10 : controlCircle.size} 
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



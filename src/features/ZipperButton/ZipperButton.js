import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector  } from 'react-redux'
import { selectZipperCircle, selectZipperClicked, selectZipperPosition, initTop } from './zipperSlice';
// import UpDownIcon from '../../icons/UpDownIcon/UpDownIcon'
import styles from './ZipperButton.module.css';




const upDownCircleColor = '#fff0ff'




const ZipperButton = ({startZip, currentMousePos}) => {

    const { x, y, size } = useSelector(selectZipperCircle)
    const clicked = useSelector(selectZipperClicked)
    const {top, left } = useSelector(selectZipperPosition)
    let newTopVal = top;
    if(clicked){
        if(currentMousePos.y > initTop){
            newTopVal = currentMousePos.y - 200
        } else {
            newTopVal = initTop
        }
    }
     


    return ( 
        <div className={styles.button} style={{left: `${left}px`, top: `${newTopVal}px`}}>
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



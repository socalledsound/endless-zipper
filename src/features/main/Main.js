import React from 'react'
import { useSelector } from 'react-redux'
import { selectCanvasWidth, selectCanvasHeight } from './mainSlice'
import MainSVG from '../../components/MainSVG/MainSVG'
import Tooth from './Tooth'




const Main = () => {
    
    const canvasWidth = useSelector(selectCanvasWidth)
    const canvasHeight = useSelector(selectCanvasHeight)
    
    return ( 

        <MainSVG canvasWidth={canvasWidth} canvasHeight={canvasHeight}>
            {
                //teeth here
            }

        </MainSVG>
           
     );
}
 
export default Main;


// const MainSVG = ({ canvasWidth, canvasHeight, circleCenter, circleRadius, soundSlices, joined, mousePos}) => {
//     // console.log(joined, soundSlices)
//     return ( 
//         <svg
//         viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
//         width={canvasWidth}
//         height={canvasHeight}
// >
//         <g>
        

//         </g>

//     {/* <circle cx={mousePos.x} cy = {mousePos.y - 120} r="10" fill="yellow" />  */}

// </svg>

//      );
// }
 
// export default MainSVG;

import React from 'react'
import { useSelector } from 'react-redux'
import { selectCanvasWidth, selectCanvasHeight } from './mainSlice'
import MainSVG from '../../components/MainSVG/MainSVG'
import Tooth from './Tooth'
import styles from './Main.module.css'
const numTeeth = 3;
const teeth = Array.from({ length: numTeeth}, (el, i) => new Tooth(i, 0, i*20 ))



const Main = () => {
    
    const canvasWidth = useSelector(selectCanvasWidth)
    const canvasHeight = useSelector(selectCanvasHeight)
    
    return ( 

        <MainSVG canvasWidth={canvasWidth} canvasHeight={canvasHeight}>
            {
               teeth.map( tooth => {
                
                const id = `tooth-${tooth.id}`
                console.log(tooth.path)
                return (
                    <g key={`tooth-group-${tooth.id}`}> 
                    <path 
                        id={id}
                        d={tooth.path}
                        fill='transparent'
                    />
                    <text style={{width: '100px', height: '100px', fontSize:'20px'}} width={canvasWidth} height={100} x={tooth.pos.x} y={tooth.pos.y} fill="#000">
                    <textPath alignmentBaseline="top" xlinkHref={id}>
                        {tooth.text} this is some more text
                    </textPath>
                    </text>
                    </g>
                )

               })
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

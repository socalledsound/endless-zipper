import React from 'react'

const MainSVG = ({canvasWidth, canvasHeight, children}) => {
    return ( 

        <svg
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
        width={canvasWidth}
        height={canvasHeight}
    >
                <g>
                {children}
                </g>
    </svg>   

     );
}
 
export default MainSVG


;
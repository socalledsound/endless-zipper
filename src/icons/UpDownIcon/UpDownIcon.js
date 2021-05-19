import React from 'react';

const upDownCircleColor = '#fff0ff'

const UpDownIcon = ({x, y, size}) => {
    return ( 
                            
    <svg  viewBox="0 0 1000 1000">
        
        <circle cx={x} cy={y} r={size} fill="#333"/>
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
       <circle cx={x} cy={y} r={size} fill="transparent" onClick={() => console.log('clicked')}/>

            

    </svg>
     );
}
 
// onClick={() => dispatch(toggleMoreAbout())}

export default UpDownIcon;
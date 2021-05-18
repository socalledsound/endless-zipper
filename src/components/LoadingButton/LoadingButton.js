import React from 'react'

import styles from './LoadingButton.module.css';

const LoadingButton = ({startLoading}) => {
    return ( 
        <div>
            <button className={styles.button} onClick={startLoading}>Load</button>
        </div>
        
     );
}
 
export default LoadingButton;



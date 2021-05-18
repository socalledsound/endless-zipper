import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../features/main/mainSlice'
import LoadingButton from '../LoadingButton/LoadingButton'
import styles from './IntroPage.module.css'

const IntroPage = () => {

    const dispatch = useDispatch()

    return ( 
        <div className={styles.introContainer}>
            <LoadingButton startLoading={() => dispatch(toggleLoading())}/>
        </div>
     );
}
 
export default IntroPage;
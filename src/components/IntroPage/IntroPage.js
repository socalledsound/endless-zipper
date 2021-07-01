import React from 'react'
import { useDispatch } from 'react-redux'
import { initAudio } from '../../app/audio-middleware/audio.actions'
import { toggleLoading } from '../../features/main/mainSlice'
import LoadingButton from '../LoadingButton/LoadingButton'
import styles from './IntroPage.module.css'
import zipper from '../../assets/zipper.png'

const IntroPage = () => {

    const dispatch = useDispatch()

    const loadSounds = () => {
        dispatch(initAudio())
        dispatch(toggleLoading())
    }

    return ( 
        <div className={styles.introContainer}>
            {/* put a background image under the button and text */}
            <LoadingButton startLoading={loadSounds}/>
            
            {/* <p>click through to zippers</p> */}
            <div>
                <img src={zipper} alt="" />
            </div>
        </div>
     );
}
 
export default IntroPage;
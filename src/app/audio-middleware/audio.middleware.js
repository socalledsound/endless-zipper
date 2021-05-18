// import CrowdSound from './CrowdSound';
import AudioActionTypes from './audio.actions.types'
import AudioEngine from './AudioEngine'

// 
export const audio = new AudioEngine();

const audioMiddleWare = store => {
   

    return next => action => {

        switch (action.type){
            
            case AudioActionTypes.PLAY_GRAIN :
                // console.log(action);
                audio.playGrain(action.payload.grain);
                break;

            case AudioActionTypes.TRIG_SOUND : 
                
            audio.trig(action.payload.idx, action.payload.audioParameters, action.payload.dir);
                break;

            case AudioActionTypes.PLAY_ALL_SOUNDS : 
                
            audio.trigAll(action.payload.dir);
                break;

            case AudioActionTypes.STOP_PLAYING_SOUND :
                audio.stop(action.payload.idx);
                break;
            case AudioActionTypes.UPDATE_VOLUME :
                audio.updateVolume(action.payload.idx, action.payload.val);
                break;  
                
            case AudioActionTypes.UPDATE_PITCH :
                audio.updatePitch(action.payload.idx, action.payload.val);
                    break;    
                      
            default :
                break;
        }
        next(action);
    }
}
export default audioMiddleWare
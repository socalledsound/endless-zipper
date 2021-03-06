import { store } from '../store'
import { sounds } from '../sounds-info/sounds'
// import { addAudioContext, addItemToPlayingSoundsList } from '../sounds-info/soundsInfo.actions'
// import Voice from '../../redux/granular/granular-objects/Voice'
// import {  getRandom } from '../../utils'
import { initBuffer, reverseBuffers, getSoundFileData } from './audio.utils'
// import { addVoice, loaded } from '../granular/granular.actions'

// import { initSoundFileData } from '../granular/granular.actions';
// import globalSettings from '../../globalSettings';
// const { numSounds } = globalSettings;

const Context = window.AudioContext || window.webkitAudioContext;

class AudioEngine {
    constructor(numBuffers){
        this.sounds = sounds;
        this.buffers = [];
        this.reversedBuffers = [];
        this.soundFileDatas = [];
        // this.indexes = Array.from({ length : numSounds}, (el, i) => i);
        this.sources = Array.from({ length: sounds.length});
        this.playingSounds = Array.from({length : sounds.length}, () => false);
        //this.init();
    }

    init(){
        this.audioContext = new Context();
        this.masterVolume = this.audioContext.createGain();
        this.initSoundBuffers(this.sounds).then((buffers) => {
            this.buffers = buffers;
            this.reversedBuffers = reverseBuffers(buffers);
            this.soundFileDatas = getSoundFileData(buffers);
            // store.dispatch(loaded())
            // store.dispatch(initSoundFileData(this.soundFileDatas));
            // store.dispatch(addAudioContext(this.audioContext))
            //const currentSetting = store.getState().controls.currentControlsSetting
            //const bufnums = Array.from({ length: currentSetting.numVoices}, () => Math.floor(getRandom(0, this.soundFileDatas.length)));
            //bufnums.forEach((bufnum, i) => {
                    //store.dispatch(addVoice(new Voice(i, bufnum, this.soundFileDatas[bufnum], i < currentSetting.numVoices ? false : true)))
                    // store.dispatch(addItemToVoicesList())
                   
                    // if(i < currentSetting.numVoices){
                    //     store.dispatch(addItemToPlayingSoundsList(soundsInfo[i]))
                    // }
                   
                //})
            
           
           
        })
    }    



    initSoundBuffers = async (snds) => {
        //this.initSoundBuffers().then( (buffers) => console.log(buffers)); \
        // console.log(this.audioContext)
        // console.log(snds, this.audioContext)
        return Promise.all(snds.map(src => initBuffer(this.audioContext, src)));   
     }


     //make the offset be the amount that the text object is unzipped....
     play(idx, audioParameters = {vol: 1.0, rate: 1.0 - (Math.random()/2)}, dir = 1){
         const gainNode = this.audioContext.createGain()
         gainNode.gain.value = audioParameters.vol;
        const buf = dir > 0 ? this.buffers[idx] : this.reversedBuffers[idx]; 
        // const offset = Math.abs(3)%buf.duration;
        this.sources[idx] = this.audioContext.createBufferSource();
        this.sources[idx].buffer = buf;
        gainNode.connect(this.audioContext.destination);
        this.sources[idx].connect(gainNode);
        this.sources[idx].loop = true;
        this.sources[idx].playbackRate.value = audioParameters.rate;
        this.sources[idx].start(0);
        this.playingSounds[idx] = true;
    }

    playGrain({ id, bufnum, offset }){
        // console.log(id);
        // console.log(store.getState().controls.voiceSettings)
        // store.dispatch(addItemToPlayingSoundsList(soundsInfo[bufnum]))

        const setting = store.getState().controls.voiceSettings.filter(setting => setting.id === id)[0];
        // console.log(setting, setting.volume);
        const { attack, release, duration } = setting;
        const masterSettings = store.getState().controls.masterSettings;
        const now = this.audioContext.currentTime;
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = setting.volume * masterSettings.volume;
        const env = (attack + release + duration);
        // console.log(attack, duration, release);
        // console.log(env, setting.volume, masterSettings.volume)
        gainNode.gain.linearRampToValueAtTime(setting.volume * masterSettings.volume, now + attack);
        gainNode.gain.linearRampToValueAtTime(0, now + env);
        this.sources[bufnum] = this.audioContext.createBufferSource();
        this.sources[bufnum].buffer = this.buffers[bufnum];
        gainNode.connect(this.audioContext.destination);
        this.sources[bufnum].connect(gainNode);
        this.sources[bufnum].playbackRate.value = setting.rate * masterSettings.rate;
        // console.log(this.buffers[bufnum].duration);
        this.sources[bufnum].start(0, offset, env);  
    }
    
    stop = (idx) => {
        this.sources[idx].stop(0);
        this.playingSounds[idx] = false;
    }

    trig(idx, audioParameters, dir){
        if(this.playingSounds[idx]){
            this.stop(idx);
        }
        else {
            this.play(idx, audioParameters, dir);
        }
    }

    trigAll(dir){

        this.indexes.forEach(idx => {   
            this.trig(idx, {vol : 1.0, rate: 1.0, offset: 0}, dir);
        })
    }

    updatePitch = (idx, val) => {
        this.sources[idx].playbackRate.value = val;
    }
    

    updateVolume = (idx, val) => {
        this.gainNodes[idx].gain.value = val;
    }
}

export default AudioEngine
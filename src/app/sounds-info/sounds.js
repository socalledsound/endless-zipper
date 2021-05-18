//import sound0 from '../assets/mp3/0.mp3';
// import sound1 from '../assets/mp3/1.mp3';
// import sound2 from '../assets/mp3/2.mp3';
// import sound3 from '../assets/mp3/3.mp3';
// import sound4 from '../assets/mp3/4.mp3';
// import sound5 from '../assets/mp3/5.mp3';
// import sound6 from '../assets/mp3/6.mp3';
// import sound7 from '../assets/mp3/7.mp3';
// import sound8 from '../assets/mp3/8.mp3';
// import sound9 from '../assets/mp3/9.mp3';

import { importAll } from '../../utils'

const soundsModules = importAll(
    require.context('../../assets/mp3/', false, /\.(mp3)$/)
);

console.log(soundsModules)

export const sounds = soundsModules.map( module => module.default);
export const titles = sounds.map(string => string.replace(/\.[^/.]+$/, "").replace(/^.*[\\/]/, ''))


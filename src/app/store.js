import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import navbarReducer from '../features/SocalledNavbar/SocalledNavBarSlice'
import mainReducer from '../features/main/mainSlice'
import audioMiddleWare from './audio-middleware/audio.middleware'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    navbar : navbarReducer,
    main : mainReducer,
  },
  middleware: [audioMiddleWare]
});

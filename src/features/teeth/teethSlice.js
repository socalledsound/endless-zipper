/*
initialize and keep track of the teeth, for the canvas
I actually don't need these to be in redux, since I ended up updating them from the canvas but it seemed easier
because of the audio, which is triggered from the zipper and gets some data from the teeth positions.
*/
import { createSlice } from '@reduxjs/toolkit'
import { titles } from '../../app/sounds-info/sounds'
import Tooth from './Tooth'
import { center, offsetY, lineHeight, font } from '../../globalSettings';
const numTeeth = titles.length;


/*
tooth wants an id, startX, startY, c1x, c1y, c2x, c2y, endX, endY
*/
const teeth = Array.from({ length: numTeeth}, (el, i) => new Tooth(i, false, center, offsetY, lineHeight, window.innerWidth, font))
const reverseTeeth = Array.from({ length: numTeeth}, (el, i) => new Tooth(i, true, center, offsetY, lineHeight, window.innerWidth, font))


const teethSlice = createSlice({
    name: 'teeth',
    initialState: {
        teeth,
        reverseTeeth,
    },
    reducers: {
        updateTeeth: (state, action) => {
            console.log('hi')
            // state.teeth[action.payload.id] = action.payload
        },
        updateReverseTeeth: (state, action) => {
            // state.reverseTeeth[action.payload.id] = action.payload
        }
    }
})

export const selectTeeth = (state) => state.teeth.teeth
export const selectReverseTeeth = (state) => state.teeth.reverseTeeth
export const { updateTeeth, updateReverseTeeth } = teethSlice
export default teethSlice.reducer
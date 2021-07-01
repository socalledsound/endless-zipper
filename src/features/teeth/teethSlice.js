import { createSlice } from '@reduxjs/toolkit'
import { titles } from '../../app/sounds-info/sounds'
import Tooth from './Tooth'

const numTeeth = titles.length;
const center = window.innerWidth/2;
const offsetY = 100;
const lineHeight = 75;
const teeth = Array.from({ length: numTeeth}, (el, i) => new Tooth(i, false, center, offsetY, lineHeight, window.innerWidth))
const reverseTeeth = Array.from({ length: numTeeth}, (el, i) => new Tooth(i, true, center, offsetY, lineHeight, window.innerWidth))

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
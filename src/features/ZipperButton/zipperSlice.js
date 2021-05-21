import { createSlice } from '@reduxjs/toolkit'

const minTopVal = 600
const initX = 100
const initY = 200
const circleSize = 100
const centerOffset = 85
export const initLeft = window.innerWidth/2 - centerOffset
export const initTop = minTopVal - (circleSize * 2)

const initialState = {
    clicked : false,
    position : { 
        left: initLeft,
        top: initTop, 
    },
    circle : {
        x: initX,
        y: initY,
        size: circleSize,
    } 
}

const zipperSlice = createSlice({
    name: 'zipper',
    initialState,
    reducers : {
        updateZipperPosition : (state, action) => {
            // console.log(action.payload)
            const newPosition = {...state.position, top: action.payload}
            console.log(newPosition)
            state.position = newPosition
        },
        toggleZipperClicked: (state) => {
            state.clicked = !state.clicked
        }
    }
})

export const selectZipperCircle = (state) => state.zipper.circle
export const selectZipperClicked = (state) => state.zipper.clicked
export const selectZipperPosition = (state) => state.zipper.position

export const { updateZipperPosition, toggleZipperClicked } = zipperSlice.actions

export default zipperSlice.reducer
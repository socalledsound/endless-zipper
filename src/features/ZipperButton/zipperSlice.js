import { createSlice } from '@reduxjs/toolkit'
const minTopVal = 600
const circleSize = 100
const centerOffset = 85
export const initLeft = window.innerWidth/2 - centerOffset
export const initTop = minTopVal - (circleSize * 2) - 100

const zipperSlice = createSlice({
    name: 'zipper',
    initialState: {
        clicked : false,
        position : { 
            left: initLeft,
            top: initTop, 
        },
    },
    reducers : {
        updateZipperPosition : (state, action) => {
            // console.log(action.payload)
            const newPosition = {...state.position, top: action.payload}
            // console.log(newPosition)
            state.position = newPosition
        },
        toggleZipperClicked: (state) => {
            state.clicked = !state.clicked
        }
    }
})

// export const selectZipperCircle = (state) => state.zipper.circle
export const selectZipperClicked = (state) => state.zipper.clicked
export const selectZipperPosition = (state) => state.zipper.position

export const { updateZipperPosition, toggleZipperClicked } = zipperSlice.actions

export default zipperSlice.reducer
/*
keeps track of the canvas size and scroll
and whether the files have loaded
*/

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    canvasWidth : window.innerWidth,
    canvasHeight: window.innerHeight * 2,
    canvasTop: 0,
    loading : false, 
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        toggleLoading: (state) => {
            state.loading = !state.loading
        },
        updateCanvasTop: (state, action) => {
            console.log(action.payload)
            state.canvasTop += action.payload
        }
    }

})

export const { toggleLoading, updateCanvasTop } = mainSlice.actions

export const selectCanvasWidth = (state) => state.main.canvasWidth
export const selectCanvasHeight = (state) => state.main.canvasHeight
export const selectCanvasTop = (state) => state.main.canvasTop
export const selectLoadingState = (state) => state.main.loading

export default mainSlice.reducer
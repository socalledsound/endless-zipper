import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    canvasWidth : window.innerWidth,
    canvasHeight: window.innerHeight,
    loading : false, 
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        toggleLoading: (state) => {
            state.loading = !state.loading
        },
    }

})

export const { toggleLoading } = mainSlice.actions

export const selectCanvasWidth = (state) => state.main.canvasWidth
export const selectCanvasHeight = (state) => state.main.canvasHeight
export const selectLoadingState = (state) => state.main.loading

export default mainSlice.reducer
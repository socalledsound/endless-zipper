import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}


const mouseSlice = createSlice({
    name: 'mouse',
    initialState,
    reducers: {
        updateMousePos : (state, action) => {
            state.currentMousePos = action.payload
        }

        }
    }
})
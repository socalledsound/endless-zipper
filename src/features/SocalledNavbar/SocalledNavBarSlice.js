import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modal: false,
    modalContentIdx: 0,
}

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers : {
        toggleModal: (state, action) => {
            console.log(action.payload)
            state.modal = action.payload
        },
        updateModal : (state, action) => {
            console.log(action.payload)
            state.modalContentIdx = action.payload
        }
    }
})


export const { toggleModal, updateModal } = navbarSlice.actions

export const selectModalState = (state) => state.navbar.modal
export const selectModalContentIdx = (state) => state.navbar.modalContentIdx

export default navbarSlice.reducer
import React from 'react';
import 'jest-canvas-mock';
import { mount } from 'enzyme'
import RootProvider from '../../RootProvider'
import SocalledNavbar from './SocalledNavbar'
import Logo from '../../assets/SimonLogo/SimonLogo'

// const setup = (initialState = {}) => {
//     const store = store
// }

const RP = () => {
    return (
        <RootProvider>
            <SocalledNavbar />
        </RootProvider>
    )
}


let wrapped
beforeEach(() => {
    wrapped = mount(<RP />)
})

afterEach(() => {
    wrapped.unmount()
})

it('has a logo', () => {
    expect(wrapped.find(Logo).length).toEqual(1)
})

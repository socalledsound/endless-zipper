import React from 'react';
import { mount } from 'enzyme'
import RootProvider from '../../RootProvider'
import Navbar from './Navbar'


// const setup = (initialState = {}) => {
//     const store = store
// }

const RP = () => {
    return (
        <RootProvider>
            <Navbar />
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

it('has a nav element', () => {
    expect(wrapped.find('nav').length).toEqual(1)
})

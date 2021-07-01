import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectModalState, selectModalContentIdx, updateModal, toggleModal } from './SocalledNavBarSlice'
import Navbar from './Navbar'
import NavbarLogoImg from './NavbarLogoImg'
import NavbarItem from './NavbarItem'
import FlexContainer from './FlexContainer'
import FlexContainerGrow from './FlexContainerGrow'


const SocalledNavbar = ({ config }) => {

    // const dispatchContent = useDispatch((dispatch) => dispatch())
    const dispatch = useDispatch()
    const modal = useSelector(selectModalState)
    const currentIdx = useSelector(selectModalContentIdx)
    const toggleModalIdx = (idx) => {
        dispatch(updateModal(idx))
        if(idx === currentIdx ){
            dispatch(toggleModal(!modal))
        } else {
            if(!modal){
                dispatch(toggleModal(true))
            }
        }
        
        
    }


    return ( 
           
        <Navbar>
             
             <FlexContainerGrow>
                {<NavbarLogoImg logo={config.logo} />}
             </FlexContainerGrow>
             <FlexContainerGrow>
                <div style={{color: 'white'}}>too many zippers</div>
            </FlexContainerGrow>
             <FlexContainer >
            {
                config && 
                    config.items.length > 0 &&

                    config.items.map((item, idx) => 
                        <NavbarItem 
                        key={item.modalContent}
                        toggleModal={() => toggleModalIdx(idx)}
                        Content={item.displayIcon}
                    />
                        )

            }
             </FlexContainer>
        </Navbar>

    
     );
}



 
export default SocalledNavbar;
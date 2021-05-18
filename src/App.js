import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectModalContentIdx, selectModalState } from './features/SocalledNavbar/SocalledNavBarSlice.js'
import { selectLoadingState } from './features/main/mainSlice'
import { toggleModal } from './features/SocalledNavbar/SocalledNavBarSlice.js'
import SocalledNavbar from './features/SocalledNavbar/SocalledNavbar'
import QuestionMark from './features/SocalledNavbar/QuestionMark'
import ControlsIcon from './features/SocalledNavbar/ControlsIcon'
import cloud from './features/SocalledNavbar/mario-cloud.png'
// import Logo from './components/SimonLogo/SimonLogo'
import About from './components/About/About'
import Controls from './features/Controls/Controls'
import Modal from './components/Modal/Modal'
import CloseModal from './components/CloseModal/CloseModal'
import Main from './features/main/Main'
import IntroPage from './components/IntroPage/IntroPage'


const navbarConfig = {
  logo: cloud,
  items : [
    {
      displayIcon : ControlsIcon, 
      modalContent : Controls,
    },
    {
      displayIcon : QuestionMark,
      modalContent : About,
    },
  ]
}


const App = () => {
  
  const dispatch = useDispatch()
  const modal = useSelector(selectModalState)
  const selectedModalIdx = useSelector(selectModalContentIdx)
  const Content = navbarConfig.items[selectedModalIdx].modalContent
 
  const loading = useSelector(selectLoadingState)

  return ( 
    <React.Fragment>
      <SocalledNavbar 
         config={navbarConfig}
      />
      
      { loading ? 
            <Main />
            :
            <IntroPage />
      }

      {
        modal && 
          <Modal>
            <CloseModal closeModal={() => dispatch(toggleModal(false))}/>
            <Content />
          </Modal>
      }

    </React.Fragment>
   );
}
 
export default App;
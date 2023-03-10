import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import './theme/global.css'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useContext, useEffect, useState } from 'react';
import { MainContext, MainContextProvider } from './context/context';
import { LoginModal } from './components/LoginModal/LoginModal';

setupIonicReact();

declare let matrixcs:any;
const InitApp: React.FC = () => {
  const {notLogged}=useContext(MainContext)

  
  const [openModal,setOpenModal]=useState(false)

  useEffect(()=>{
    if(notLogged==="no"){
      setOpenModal(true)
    }
    


  },[notLogged])
  return (
    <IonApp>
      <LoginModal visible={openModal} setModalVisible={setOpenModal}/>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/home" />
            </Route>
            <Route path="/page/:name" exact={true}>
              <Page />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};



function App(){

  return(
    <MainContextProvider>
      <InitApp />
    </MainContextProvider>
  )
}


export default App;

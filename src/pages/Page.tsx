import { IonButtons, IonContent, IonHeader, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { Card } from '../components/card/Card';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/header/Header';
import { MainContext } from '../context/context';
import './Page.css';
declare let matrixcs:any;
const Page: React.FC = () => {
  const {message}=useContext(MainContext)

  useEffect(()=>{
    



  },[])

  const { name } = useParams<{ name: string; }>();
  

  return (
    <IonPage>
      <Header name="" />
      <IonContent fullscreen>
        
        <div className="pageCenter">
         {message&&<Card atributos={message?.atributos}/>}


        </div>


      </IonContent>
      
    </IonPage>
  );
};

export default Page;

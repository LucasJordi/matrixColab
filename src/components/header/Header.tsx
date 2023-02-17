import { IonBackButton, IonButton, IonButtons, IonHeader, IonImg, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/react';
import './Header.css';

interface ContainerProps {
  name?: string;
  title?:string;
}

const Header: React.FC<ContainerProps> = ({ name="",title="" }) => {
  
  return (
    <IonHeader class="ion-no-border">
      
      <IonToolbar className='toolBarHeader' >
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
          <IonMenuToggle >
            <IonButton>
              <IonImg className='imgClass' src='assets/logo11.svg'></IonImg>
            </IonButton>
          </IonMenuToggle>
        </IonButtons>
        
        
      </IonToolbar>
      
      <IonTitle className='title' >{title}</IonTitle>
    </IonHeader>
  );
};

export default Header;

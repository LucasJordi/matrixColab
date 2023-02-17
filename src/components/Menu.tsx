import {
  IonAvatar,
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, logoOctocat, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import styles from './Menu.module.css';
import { MainContext } from '../context/context';
import { useContext } from 'react';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}



const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = (props:any) => {
  const {rooms,getRoomSync,createRoom,userNameT,setUserNameT}=useContext(MainContext)

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id={"inbox-list"}>
        <IonAvatar>
          <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          
        </IonAvatar>
          <IonListHeader>{userNameT}</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          <IonListHeader>Salas</IonListHeader>
          <IonButton
            onClick={()=>{
              createRoom()
            }}
          >Adicionar sala</IonButton>
          {rooms.map((item:any, index:any) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem button routerDirection="none" lines="none" detail={false} onClick={()=>{
                  getRoomSync(item.id)
                }}>
                  <IonIcon slot="start" md={logoOctocat} />
                  <IonLabel>{item.name}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

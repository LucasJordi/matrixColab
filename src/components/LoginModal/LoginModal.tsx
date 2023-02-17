import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonText } from "@ionic/react"
import { close, closeCircle, personCircle } from "ionicons/icons"
import { useContext, useRef, useState } from "react"
import { MainContext } from "../../context/context"
import { TextC } from "../Textc/Textc"
import "./LoginModal.css"

declare let matrixcs:any;

export const LoginModal=(props:any)=>{
    const [user,setUser]=useState<any>("")
    const [pass,setPass]=useState<any>("")
    const {setUserLogged}=useContext(MainContext)
    const modal = useRef<HTMLIonModalElement>(null);
    function dismiss() {
        modal.current?.dismiss();
    }

    return(
        <>
        
        <IonModal id="example-modal" isOpen={props?.visible} ref={modal} trigger="open-custom-dialog" onDidDismiss={()=>props.setModalVisible(false)}>
            
            
          <div className="wrapper">
            <div className="modalWrapper">
                <IonText style={{fontSize:"30px"}} >Faça seu Login</IonText>
                <IonList className='listLogin'>
                    <IonItem  className='itemLogin' lines="none">
                        <IonLabel position="stacked">Usuário Matrix</IonLabel>
                        <IonInput onIonInput={value=>setUser(value.target.value)} className="inputModal"></IonInput>
                    </IonItem>
                    <IonItem  className='itemLogin' lines="none">
                        <IonLabel position="stacked">Senha</IonLabel>
                        <IonInput type="password" onIonInput={value=>setPass(value.target.value)} className="inputModal"></IonInput>
                    </IonItem>

                </IonList>
                
                <IonButton onClick={()=>{
                    const client = matrixcs.createClient({baseUrl: "https://matrix.org"})
                    client.login("m.login.password", {"user": user, "password": pass})
                    .then((data:any)=>{
                        localStorage.setItem("userId",user)
                        localStorage.setItem("token",data.access_token)
                        setUserLogged({user:user,token:data.access_token})
                        props.setModalVisible(false)

                    })
                    .catch((error:any)=>{
                        alert("Usuário ou senha incorreta!")
                    })


                }} className="inputModalBtn" color={"primary"}>LOGAR</IonButton>

            </div>
            
          </div>
        </IonModal>
        </>
        
    //     <Modal
    //         visible={props.visible}
    //         transparent={true}
    //     >
    //         <div style={styles.container}>
    //                 <button className="btnClose" onClick={()=>props.setModalVisible(false)}>
    //                     <IonIcon icon={close} />

    //                 </button>

    //             <div style={styles.box}>
    //                 <div style={[styles.center,{flex:1}]}>
    //                     <TextInput
    //                      textAlign={'center'}
    //                      onChangeText={(text:any)=>setData(text)}
    //                      style={{
    //                         width:"90%",
    //                         height:"60%",
    //                         borderColor:"black",
    //                         borderWidth:2,
    //                         borderRadius:20
    //                      }}
    //                     />

    //                 </div>
    //                 <div style={[styles.center,{flex:1}]}>
    //                     <button style={styles.btn1} onClick={()=>{
    //                         props.insertItem(data)
    //                         props.setModalVisible(false)
    //                     }}>
    //                         <TextC style={styles.text1}>
    //                             ADICIONAR
    //                         </TextC>
    //                     </button>

    //                 </div>
                    

    //             </div>

    //         </div>

    //     </Modal>
    )

}
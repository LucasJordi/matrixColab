import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonSpinner } from "@ionic/react"
import { close, closeCircle, personCircle } from "ionicons/icons"
import { useRef, useState } from "react"
import { TextC } from "../../components/Textc/Textc"
import "./ForgotPass.css"



export const ForgotPass=(props:any)=>{
    const [data,setData]=useState<any>("")
    const modal = useRef<HTMLIonModalElement>(null);
    function dismiss() {
        modal.current?.dismiss();
    }

    return(
        <>
        
        <IonModal id="modalSave" isOpen={props?.visible} ref={modal}  >
            
            
          <div className="wrapper">
            <div className="modalWrapper">
                <IonLabel>Digite o email para recuperação de senha</IonLabel>
                <IonInput onIonInput={value=>{
                    setData(value.target.value)
                }} className="inputModal"></IonInput>
                <IonButton onClick={()=>{
                    props.sendNew()

                }} className="inputModalBtn" color={"primary"}>{props.loadingSave?<IonSpinner></IonSpinner>:'Enviar'}</IonButton>

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
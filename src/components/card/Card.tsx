
import  "./Card.css"

import React, { useContext, useEffect, useRef, useState } from "react";
import { TextC } from "../Textc/Textc";
import { IonButton, IonIcon, IonItem, IonList, IonText, useIonAlert } from "@ionic/react";
import { add, close, removeOutline, search } from "ionicons/icons";
import { AddModal } from "../../modals/AddModal/AddModal";
import { MainContext } from "../../context/context";


export const Card=React.forwardRef((props:any,ref:any)=>{
    const {changeData,message}=useContext(MainContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [presentAlert] = useIonAlert();
    const [atributos,setAtributos]=useState<any>([])
    
    const [shadow,setShadow]=useState({backgroundColor:"white"})
    
    const insert=(item:any)=>{

        setAtributos((atributos:any)=>[...props.atributos,item])

        changeData([...props.atributos,item])
       
        
    }
    const remove=(item:any)=>{
        setAtributos((atributos:any)=>atributos.filter((child:string)=>child !=item))
        changeData(atributos.filter((child:string)=>child !=item))

    }
    useEffect(()=>{
        console.log(atributos)    
        setAtributos(message.atributos)

        console.log("messagem",message)

        

    },[atributos,message])
    


    return(
        <>
        <AddModal insertItem={(item:any)=>insert(item)} itens={props?.atributos} visible={modalVisible} setModalVisible={setModalVisible}/>

        <div className="cardContainer">
            
            <div className="cardTop colorCard2">
                    <IonText className="cardText">{props?.text}</IonText>
                    <button className="addButton" onClick={()=>setModalVisible(true)}>
                        <IonIcon className="iconAdd" icon={add}   />

                    </button>
                    


            </div>
            <div className="cardItens">
                <IonList className="listCard">

                    {
                        atributos.map((item:any,index:number)=>(
                            <IonItem className={index+1<props?.atributos.length?"itemIonCard borderBtn":"itemIonCard "} key={index} button lines="none" >
                                <IonText>{item}</IonText>

                                <button className="addButton" onClick={()=>remove(item)}>
                                    <IonIcon className="iconAdd" icon={removeOutline}   />

                                </button>
                                
                            </IonItem>
                        ))
                    }
                </IonList>

            </div>
            
            
        </div>
        </>
    )
})
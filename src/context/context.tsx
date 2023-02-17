import { createContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";


export const MainContext = createContext<any>("");
interface Props {
    children: React.ReactNode;
}

interface UserLogged {
    user: any;
    token: any;
}

declare let matrixcs:any;
export const MainContextProvider:React.FC<Props>=(props)=>{
    const [roomId,setRoomId]=useState(null)
    const [userNameT,setUserNameT]=useState<any>("Desconhecido")
    const [message,setMessage]=useState(null)
    const [userLogged,setUserLogged]=useState<UserLogged>()
    const [rooms,setRooms]=useState<any>([])
    const [notLogged,setNotLogged]=useState("trying")
    const [loading,setLoading]=useState(false)
    const hashRoom="c73d32a470e3cb3a8449ee903309d133"
    let client:any=null
    

    useEffect(()=>{
        const userName=localStorage.getItem("userId")
        const accessToken=localStorage.getItem("token")
        
        setUserNameT(localStorage.getItem("userId"))
        
        
      
        const init=async()=>{
            const client = matrixcs.createClient({
                baseUrl: "https://matrix.org",
                accessToken: localStorage.getItem("token"),
                userId: localStorage.getItem("userId")
              });
            // const loginToken=await client.login("m.login.password", {"user": user, "password": "Jabber@0997"})
      
            // console.log(loginToken,loginToken.access_token)
      
      
            await client.startClient();
      
            client.once('event', function(state:any, prevState:any, res:any) {
              // console.log("state",state); // state will be 'PREPARED' when the client is ready to use
            //   console.log(state)
            });
            client.on('event', function(event:any, prevState:any, res:any) {
                // console.log("state",state); // state will be 'PREPARED' when the client is ready to use
              //   console.log(state)
              console.log(event.getRoomId(),localStorage.getItem("idRoom"))
              if(event.getRoomId()===localStorage.getItem("idRoom")){
                setMessage(JSON.parse(event.event.content.body))

              }
              console.log("timeline",event.event.content.body)
              });
            setRooms([])
            client.on('Room.name', function(event:any, prevState:any, res:any) {
                // console.log("state",state); // state will be 'PREPARED' when the client is ready to use
                
                

                if(event.name.indexOf(hashRoom)>-1){
                    setRooms((element:any)=>[...element,{name:event.name.split(hashRoom)[1],id:event.roomId}])


                }
                
              });
      
        }
        if(userLogged?.token!=null&&userLogged.user!=null){
            console.log("passou")
            setNotLogged("yes")
            
            try{
                init()

            }catch(e){
                setNotLogged("not")
                setUserLogged(undefined)
                localStorage.clear()
                console.log(e,"error")


            }
            

        }else{
            setNotLogged("no")
        }

    },[userLogged])
    useEffect(()=>{
        console.log("room",rooms)
    },[rooms])

    const getRoomSync=async(id:any)=>{
        const a="AwgAEsABJ3uRw6gMyL3Qkzp98AWlGjvgPrEdq5b63BdpiIYAa7T1wvIatjNWQM2uOSDljOUQA1uj0c73iYlIBQZWnr8PAry2pjSIpmHvme+YD0jiaRu1MvciQmnH5oN+gCrCUk2wRUXvtNpFgPyu8z//kOPyvnHeehalEViSGbczAJczINnoB5dOh2PkWPUn1/f+/k2a/JxyPLE3KNa0UwCoA7xbX279KNMwSa2X+8WdVLX61MoFjnDLXVSWVJSO5fhJj7am1RCRs06c4GX9CBSkBuKNT+1O8Tba7NsuSHjrsF8bHLC/bSokEVmOs4KNkAG4lgEQzfHcaxvcmaH2NPWfAi7vrRbHe18+ZvMM"
        const client = matrixcs.createClient({
                baseUrl: "https://matrix.org",
                accessToken: localStorage.getItem("token"),
                userId: localStorage.getItem("userId")
              });
        localStorage.setItem("idRoom",id)
        setRoomId(id)
        console.log(id)
        const room=await client.roomInitialSync(id)
        const mmRoom=room.messages.chunk.filter((element:any)=>element.content.body)
        console.log(room.messages.chunk.filter((element:any)=>element.content.body))
        const message=mmRoom.at(-1).content.body
        setMessage(JSON.parse(message))
        
        
    }
    const createRoom=async()=>{
        const client = matrixcs.createClient({
            baseUrl: "https://matrix.org",
            accessToken: localStorage.getItem("token"),
            userId: localStorage.getItem("userId")
          });
        const newRoom=await client.createRoom({name:hashRoom+"Sala"+(rooms.length+1),visibility:"private"})
        const data={
            user:localStorage.getItem("userId"),
            atributos:[]
        }
        var content = {
            "body": JSON.stringify(data),
            "msgtype": "m.text"
        };
        client.sendEvent(newRoom.room_id, "m.room.message", content, "")
        .then((resp:any)=>{

        })
    }

    const changeData=async(atributos:any)=>{
        const client = matrixcs.createClient({
            baseUrl: "https://matrix.org",
            accessToken: localStorage.getItem("token"),
            userId: localStorage.getItem("userId")
          });
        const data={
            user:localStorage.getItem("userId"),
            atributos:atributos
        }
        var content = {
            "body": JSON.stringify(data),
            "msgtype": "m.text"
        };
        client.sendEvent(roomId, "m.room.message", content, "")
        .then((resp:any)=>{

        })
    }
    useEffect(()=>{
        if(roomId!=null){

        }

    },[roomId])
    

    return(
        <MainContext.Provider value={{userNameT,setUserNameT,changeData,createRoom,getRoomSync,notLogged,roomId,setRoomId,userLogged,setUserLogged,rooms,message}}>
            {props?.children}

        </MainContext.Provider>
    )
}
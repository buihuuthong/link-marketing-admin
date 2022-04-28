import React,{createContext,useState} from 'react';

const MedalContext = createContext()

const MedalProvider = ({children})=>{
    const [fullname,setFullname]= useState('')
    const [sdt,setSdt]= useState('')
    const [cmnd,setCmnd]= useState('')
    return (
        <MedalContext.Provider value={{fullname,setFullname,sdt,setSdt,cmnd,setCmnd}}>
            {children}
        </MedalContext.Provider>
    )
}
export default MedalProvider;
export {MedalContext}
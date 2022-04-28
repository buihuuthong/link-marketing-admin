import React from 'react';

import '../../../../../assets/auth/css/styles.css';
import '../../../../../assets/auth/js/scripts';

const InputPassword = (props)=>{
    
      return (
      
         <input className={props.className} id={props.id} type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange ? (e) => props.onChange(e) : null} />
        
          
        
      
      )
}
export default InputPassword;
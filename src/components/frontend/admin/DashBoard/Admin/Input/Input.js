import React from 'react';

const Input = (props)=>{
    <input    type={props.type} 
    className={props.className}
    placeholder={props.placeholder}
   name={props.name}
   />
}
export default Input
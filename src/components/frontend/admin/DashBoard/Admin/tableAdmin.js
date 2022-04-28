import React from 'react';
import {useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import '../../../../../sass/Button.scss';
import ModalBlock from './ModalAdmin/Modal/ModalBlock'
import ModalUpdate from './ModalAdmin/Modal/ModalUpdate'
import ModalDelete from './ModalAdmin/Modal/ModalDelete'
import ModalToday from './ModalAdmin/Modal/ModalToday'
import ModalUser from './ModalAdmin/Modal/ModalUser'
const TableAdmin =(props)=>{
  const[modalUpdate, setmodalUpdate] = useState(false);
  const[modalUser, setmodalUser] = useState(false);
  const [saleOpen,setSaleOpen] = useState(false);
  const[modalToday, setmodalToday] = useState(false);
  const [saleDelete,setSaleDelete] = useState(false);
    const {id,fullname,status,sdt,cmnd} =props.sale
    
  return (
      <React.Fragment>
           <tr key={id}>
      <td scope="row">{id}</td>
      <td>{fullname}</td>
      <td>{status}</td>
      <td>{sdt}</td>
      <td>{cmnd}</td>
      <td  className="btn">
    
        {/* Modal Block */}
         
          <Button  className="btn-Open"onClick={()=>{setSaleOpen(true)}}>Khóa</Button>
        <ModalBlock show={saleOpen}onHide={()=>{setSaleOpen(false)}} handleBlock={props.handleBlock} status={status}id={id}/>

        
        {/* Modal update */}
        <Button  className="btn-Update"onClick={()=>{setmodalUpdate(true)}}>Update</Button>
           <ModalUpdate show={modalUpdate}onHide={()=>setmodalUpdate(false)} createSale={props.createSale} />
        
        {/* Modal User */}
           <Button  className="btn-User"onClick={()=>{setmodalUser(true)}}>User</Button>
           <ModalUser show={modalUser}onHide={()=>{setmodalUser(false)}}/>


        {/* Modal Today */}
        <Button  className="btn-Today"onClick={()=>{setmodalToday(true)}}>Today</Button>
            <ModalToday show={modalToday}onHide={()=>{setmodalToday(false)}}/>

         {/* Modal Delete    */}
         <Button className="btn-delete" onClick={()=>{setSaleDelete(true)}}>Xóa</Button>
         <ModalDelete show={saleDelete}onHide={()=>{setSaleDelete(false)}}onDeleteSale={props.onDeleteSale}id={id}/>
     
      </td>
     
    </tr>
   
      </React.Fragment>
  )
      
  
}
export default TableAdmin;
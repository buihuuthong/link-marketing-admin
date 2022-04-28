import React from 'react';
import Modal from 'react-bootstrap/Modal'
const ModalBlock =(props)=>{
  const handleblock =()=>{
    props.handleBlock(props.id);
    props.onHide();
  }
    return(
      <Modal 
      {...props}
      size='700px'
   aria-labelledby='contained-moadal-title-vcenter'
   centered
   
      >
          
        <Modal.Header closeButton>
           <h3 style={{fontWeight:"bold",color:"black"}}>Khóa Tài Khoản</h3>
        </Modal.Header>
        <Modal.Body>
             <div style={{textAlign:"center"}} >
                 <h3 >Bạn có chắc chắn ?</h3>
                 <h3>Muốn khóa tài khoản này!</h3>
             </div>
        </Modal.Body>
          <Modal.Footer>    
          <button className="btn-back"onClick={()=>props.onHide()}>Đóng</button>     
            <button className="btn-save"onClick={handleblock}>Khóa</button>
           
          </Modal.Footer>
      </Modal>
    )
}
export default ModalBlock;


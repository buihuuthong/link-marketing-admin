import React from 'react';
import Modal from 'react-bootstrap/Modal'

const ModalUser =(props)=>{
    return(
      <Modal 
      {...props}
      size='500px'
   aria-labelledby='contained-moadal-title-vcenter'
   centered
      >
        <Modal.Header closeButton>
           <h3 style={{fontWeight:"bold",color:"black"}}>Danh sách User</h3>
        </Modal.Header>
        <Modal.Body>
         <div style={{position: "relative",right:"-270px"}}>
             <label style={{padding:"0 10px"}}>hôm nay</label>
             <label>Tháng này</label>
             <label style={{padding:"0 10px"}}>tất cả</label>
         </div>
         <div>
         <table className="table"style={{textAlign: 'center'}}>
  <thead>
    <tr>
      <th scope="col">STT</th>
      <th scope="col">Tên</th>
      <th scope="col">SĐT</th>
     
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
    
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
    
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
    </tr>
  </tbody>
</table>
         </div>
         
           
        </Modal.Body>
          <Modal.Footer>
            
            <button className="btn-back"onClick={()=>{props.onHide()}}>Đóng</button>
          </Modal.Footer>


      </Modal>
    )
}
export default ModalUser;
import Modal from 'react-bootstrap/Modal'
import './Modal.scss'

const ModalUpdate =(props)=>{
     return(
      <Modal 
       {...props}
       size='500px'
    aria-labelledby='contained-moadal-title-vcenter'
    centered
       >
         <Modal.Header closeButton>
            <h3 style={{fontWeight:"bold",color:"black"}}>Thêm Sale</h3>
         </Modal.Header>
         <Modal.Body>
           <form id="inputadd">
             <div className="form-group">
             <h7 style={{fontWeight:"bold",color:"black"}}>Nhập họ Tên</h7>
             {/* fullname */}
      <div className="Inputfullname">
            <label className="input">
            <input  
           type="text" 
           className="input__field" 
           placeholder="Họ và Tên"
          />
            
             <div className="input__icon-hold">
               <span className="input__icon" data-feather="mail"></span>
              </div>
             </label>
       </div>
             </div>
            <div className="form-group"style={{margin:"20px 0"}}>
            <h7 style={{fontWeight:"bold",color:"black"}}>Nhập Số Điện Thoại</h7>
         {/* input sdt */}
         <div className="Inputfullname">
      <label className="input">
      <input 
      type="text"
            className="input__field"
             placeholder="Số điện Thoại"
            />
      
       <div className="input__icon-hold">
         <span className="input__icon" data-feather="mail"></span>
        </div>
       </label>
      </div>
            </div> 
            
                
           <div className="form-group">
           <h7 style={{fontWeight:"bold",color:"black"}}>Nhập Chứng Minh Nhân Dân</h7>
          
          {/* input cmnd */}
          <div className="Inputfullname">
      <label className="input">
      <input 
      type="text"
      className="input__field"
       placeholder="Chứng minh nhân dân"
      />
      
       <div className="input__icon-hold">
         <span className="input__icon" data-feather="mail"></span>
        </div>
       </label>
       </div>

           </div>    
           </form>            
         </Modal.Body>
           <Modal.Footer>
            
             <button className="btn-save" onClick={()=>{props.handleClickcreate()}} >Lưu</button>
           </Modal.Footer>


       </Modal>
     )
}
export default ModalUpdate;
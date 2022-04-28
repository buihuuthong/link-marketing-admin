import Modal from 'react-bootstrap/Modal'
import react from 'react'
import {useContext} from 'react'
import {MedalContext} from '../../../../../../context/Context'
import './Modal.scss'



const ModalAdd =(props)=>{
   
const {fullname,sdt,cmnd,setFullname,setSdt,setCmnd} = useContext(MedalContext)
   
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
      <div className="InputModal">
            <label className="input">
            <input  
           type="email" 
           className="input__field" 
           placeholder="Họ và Tên"
          name="fullname"
          value={fullname}
          onChange={(e)=>setFullname(e.target.value)}
         
          />
            
             <div className="input__icon-hold">
               <span className="input__icon" data-feather="hoten"></span>
              </div>
             </label>
       </div>
             </div>
            <div className="form-group"style={{margin:"20px 0"}}>
            <h7 style={{fontWeight:"bold",color:"black"}}>Nhập Số Điện Thoại</h7>
         {/* input sdt */}
         <div className="InputModal">
      <label className="input">
      <input type="text"
            className="input__field"
             placeholder="Số điện Thoại"
             name="sdt"
             value={sdt}
             onChange={(e)=>setSdt(e.target.value)}
            />
      
       <div className="input__icon-hold">
         <span className="input__icon" data-feather="sdt"></span>
        </div>
       </label>
      </div>


            </div>     
           <div className="form-group">
           <h7 style={{fontWeight:"bold",color:"black"}}>Nhập Chứng Minh Nhân Dân</h7>
          
          {/* input cmnd */}
          <div className="InputModal">
      <label className="input">
      <input
      type="text"
      className="input__field"
       placeholder="Nhập chứng minh nhân dân"
       value={cmnd}
       onChange={(e)=>setCmnd(e.target.value)}
    
      />
      
       <div className="input__icon-hold">
         <span className="input__icon" data-feather="cmnd"></span>
        </div>
       </label>
       </div>

           </div>    
           </form>            
         </Modal.Body>
           <Modal.Footer>
            
             <button className="btn-save"onClick={props.handleCreate}>Lưu</button>
           </Modal.Footer>


       </Modal>
     )
}
export default ModalAdd;
import Table from 'react-bootstrap/Table'
const ForgotPassword=()=>{
    return (
        <div>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>STT</th>
      <th>FullName</th>
      <th>SĐT</th>
      <th>Ngày</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td >Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
        </div>
    )
}
export default ForgotPassword;
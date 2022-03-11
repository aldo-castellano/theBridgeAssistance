import React , {useState,useEffect} from "react";
import { Button, TextField } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserList() {
  const navigate = useNavigate()
  const [users,setUsers] = useState([]);
 
  useEffect(() => {
    getUsers();
  }, []);

const getUsers = async() =>{
  let url = "http://localhost:3003/api/user/all";
  try {
    setUsers(await (await axios.get(url)).data)
  } catch (error) {
    
  }
}

const handleSelection = (a)=> {
  navigate("/edit-user", {state:{id: a.id}}) 

}
//Definicion columnas grid
const columns = [
  {field:'firstname',headerName: 'Nombre', flex: 1},
  {field:'lastname',headerName: 'Apellido', flex: 1},
  {field:'login',headerName: 'login',flex: 1}
]
  return (
    <div className="user-list-container">
      <div className="user-list-title">
        <h2>Usuarios</h2>
      </div>
      <div className="user-list-table">
        <div className="user-list-control">
          <Button variant="contained" onClick={()=>navigate("/add-user") }>Crear usuario</Button>
         
        </div>
        <div className="list-users">
        <DataGrid
        rows={users}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        onRowDoubleClick={handleSelection}    
        
      /></div>
      </div>
    </div>
  );
}

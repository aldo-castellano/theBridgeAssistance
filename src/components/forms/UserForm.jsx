import React , {useState,useEffect} from "react";
import { Button,TextField ,Select, MenuItem ,InputLabel,FormControl} from "@mui/material";
import { Controller , useForm} from "react-hook-form";
import * as yup from "yup";
import { ThemeProvider } from "@mui/material/styles";
import { yupResolver} from "@hookform/resolvers/yup";
import axios from 'axios';
import theme from "../../assets/formConfi";


const schemaUser = yup.object().shape({
    firstname : yup.string().min(3,"El nombre debe tener un minimo de 3 caracteres").required(),
    lastname : yup.string().min(3,"El apellido debe tener un minimo de 3 caracteres").required(),
    login : yup.string().min(3,"El login debe tener un minimo de 3 caracteres").required(), 
    // WIP VERIFICACION SI EL LOGIN EXISTE
    password: yup.string().required('Es necesaria una contraseña'),
    confirmPassword : yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
    email:yup.string().email("Introduce un email valido"),
    rol: yup.string().required()
  })

export default function UserForm({setForm,title}) {
  const {
    control:controlUser,
    handleSubmit,
    formState: { errors:errorsUser },
  
  } = useForm({
    resolver:yupResolver(schemaUser)
  });

  const [rols,setRols] = useState([])

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async()=>{
    let url = "http://localhost:3003/api/roles/all"

    try {
      setRols(await (await axios.get(url)).data)
    } catch (error) {
      console.log("Error en getRoles");
    }
  }

  const onSubmit = data => setForm(data)

  return (
    <>
       <div className="add-form-header">
        <h2>{title}</h2>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} >
      <div className="form-contianer">
      <Controller
        name="firstname"
        control={controlUser}
        defaultValue=""
        fullWidth
        render={({ field }) => (
          <TextField
            {...field}
            id="first-name-input"
            label="Nombre"
            variant="standard"
            error={!!errorsUser.firstname}
            helperText={errorsUser.firstname ? errorsUser.firstname?.message : ""}
          />
        )}
      />
      <Controller
        name="lastname"
        control={controlUser}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            id="last-name-input"
            label="Apellidos"
            variant="standard"
            error={!!errorsUser.lastname}
            helperText={errorsUser.lastname ? errorsUser.lastname?.message : ""}
          />
        )}
      />

      <Controller
        name="login"
        control={controlUser}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            id="login-input"
            label="Login"
            variant="standard"
            error={!!errorsUser.login}
            helperText={errorsUser.login ? errorsUser.login?.message : ""}
          />
        )}
      />

      <Controller
        name="password"
        control={controlUser}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            id="password-input"
            label="Contraseña"
            variant="standard"
            error={!!errorsUser.password}
            helperText={errorsUser.password ? errorsUser.password?.message : ""}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={controlUser}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            id="password-input"
            label="Confirma contraseña"
            variant="standard"
            error={!!errorsUser.confirmPassword}
            helperText={
              errorsUser.confirmPassword ? errorsUser.confirmPassword?.message : ""
            }
          />
        )}
      />
      <Controller
        name="email"
        control={controlUser}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            id="email-input"
            label="Email"
            variant="standard"
            error={!!errorsUser.email}
            helperText={errorsUser.email ? errorsUser.email?.message : ""}
          />
        )}
      /><ThemeProvider theme={theme}>
       <FormControl sx={{mt:"25px"}} >
          <InputLabel id="demo-simple-select-label">Rol</InputLabel>              
          <Controller
            name="rol"
            control={controlUser}
            defaultValue={""}
            
            render={({ field }) => (
              <Select {...field}   label="Rol">
                {rols.map(e=><MenuItem key={e.id}value={e.id}>{e.name}</MenuItem>)}
                
                
              
              </Select>
            )} />
             
            </FormControl>
            </ThemeProvider>
       <Button variant="contained" type="submit" sx={{mt:4}}>Crear</Button></div>
      </form>
      
    </>
  );
}

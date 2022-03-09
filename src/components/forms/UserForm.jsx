import React from "react";
import { Button,TextField } from "@mui/material";
import { Controller , useForm} from "react-hook-form";
import * as yup from "yup";
import { yupResolver} from "@hookform/resolvers/yup";


const schemaUser = yup.object().shape({
    firstname : yup.string().min(3,"El nombre debe tener un minimo de 3 caracteres").required(),
    lastname : yup.string().min(3,"El apellido debe tener un minimo de 3 caracteres").required(),
    login : yup.string().min(3,"El login debe tener un minimo de 3 caracteres").required(), 
    // WIP VERIFICACION SI EL LOGIN EXISTE
    password: yup.string().required('Es necesaria una contraseña'),
    confirmPassword : yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
    email:yup.string().email("Introduce un email valido")
  
  })

export default function UserForm({setForm,title}) {
  const {
    control:controlUser,
    handleSubmit,
    formState: { errors:errorsUser },
  
  } = useForm({
    resolver:yupResolver(schemaUser)
  });

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
        render={({ field }) => (
          <TextField
            {...field}
            id="first-name-input"
            label="Nombre"
            variant="standard"
            error={!!errorsUser.firstName}
            helperText={errorsUser.firstName ? errorsUser.firstName?.message : ""}
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
            error={!!errorsUser.lastName}
            helperText={errorsUser.lastName ? errorsUser.lastName?.message : ""}
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
      />
       <Button variant="contained" type="submit" sx={{mt:4}}>Crear</Button></div>
      </form>
      
    </>
  );
}

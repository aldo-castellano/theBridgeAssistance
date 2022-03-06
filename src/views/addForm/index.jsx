import React , { useState, useEffect } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useLocation } from "react-router-dom";
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import logo from "assets/img/thebridgelogo.svg";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../assets/formConfi";


const AddForm = () => {
    const [date,setDate] = useState(Date.now());
    const [formType,setFormType] = useState(0);
    const { pathname } = useLocation();
  useEffect(() => {
    setFormType(getTypeForm(pathname))
  }, []);

  function getTypeForm(path) {
    switch (path) {
      case "/add-user":
        return 0
      case "/add-course":
          return 1
      default:
        break;
    }
    
  }
  function handleDateChange(dateC){
        setDate(dateC);
    }


 // lastName, firstName, login, password,email
  const userForm = (<>
    <TextField id="first-name-input" label="Nombre" variant="standard" />
    <TextField id="last-name-input" label="Apellidos" variant="standard" />
    <TextField id="login-input" label="Login" variant="standard" />
    <TextField id="password-input" label="Contraseña" variant="standard" />
    <TextField id="email-input" label="Email" variant="standard" />
  </>)  

  //
   const courseForm = (<>
   
    <TextField id="title-input" label="Titulo del curso" variant="standard" />
    <ThemeProvider theme={theme}>
    <div className="datepick">
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
        label="Inicio de curso"
        id="date-form"
        value={date}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params}  />}
        /></LocalizationProvider></div>
    <div className="datepick">
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
        label="Fin de curso"
        id="date-form"
        value={date}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
      </div>
      </ThemeProvider>
    
  </>)  
  return (<div className="add-form">
      <div className="add-form-header">
        <h2>AGREGAR UN {formType === 0 ? "ALUMNO" : "CURSO"}</h2>        
        </div>
      
      <div className="form-container">
          {formType === 0 ? userForm : courseForm }
      </div>
      
      </div>);
};
export default AddForm;
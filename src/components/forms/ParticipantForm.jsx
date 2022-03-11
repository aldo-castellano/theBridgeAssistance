import React , {useState,useEffect} from "react";
import { Button,TextField , Select, MenuItem ,InputLabel,FormControl } from "@mui/material";
import { Controller , useForm} from "react-hook-form";
import * as yup from "yup";
import { yupResolver} from "@hookform/resolvers/yup";
import axios from 'axios';
import theme from "../../assets/formConfi";
import { ThemeProvider } from "@mui/material/styles";

const schemaParticipant = yup.object().shape({
    firstname : yup.string().min(3,"El nombre debe tener un minimo de 3 caracteres").required(),
    lastname : yup.string().min(3,"El apellido debe tener un minimo de 3 caracteres").required(),
    courseid : yup.string().required(),
  })

export default function ParticipantForm({setForm,title}) {
  const {
    control:controlParticipant,
    handleSubmit,
    formState: { errors:errorsParticipant},
  
  } = useForm({
    resolver:yupResolver(schemaParticipant)
  });
 
  const [coursesArr,setCoursesArr] = useState([]);

  useEffect(() => {
    getCourses()

  }, []);

  const getCourses = async()=>{
    let url = "http://localhost:3003/api/course/all"

    try {
      setCoursesArr(await (await axios.get(url)).data)
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
        control={controlParticipant}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            id="first-name-input"
            label="Nombre"
            variant="standard"
            error={!!errorsParticipant.firstname}
            helperText={errorsParticipant.firstname ? errorsParticipant.firstname?.message : ""}
          />
        )}
      />
      <Controller
        name="lastname"
        control={controlParticipant}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            id="last-name-input"
            label="Apellidos"
            variant="standard"
            error={!!errorsParticipant.lastname}
            helperText={errorsParticipant.lastname ? errorsParticipant.lastname?.message : ""}
          />
        )}
      />
<ThemeProvider theme={theme}>
  <FormControl >
          <InputLabel id="demo-simple-select-label">Curso</InputLabel>              
          <Controller
            name="courseid"
            control={controlParticipant}
            defaultValue={""}
            
            render={({ field }) => (
              <Select {...field} label="Curso">
               {coursesArr.map(element=><MenuItem key={element.id} value={element.id}>{element.title}</MenuItem>)}
              
              </Select>
            )} />
            </FormControl>
            </ThemeProvider>
      
       <Button variant="contained" type="submit" sx={{mt:4}}>Crear</Button></div>
      </form>
      
    </>
  );
}

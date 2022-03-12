import React, { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../assets/formConfi";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const schemaCourse = yup.object().shape({
  title: yup
    .string()
    .min(3, "El titulo debe tener un minimo de 3 caracteres")
    .required("Este campo es obligario"),
  startdate: yup.date().required("Es necesario este campo"),
  enddate: yup
    .date()
    .min(
      yup.ref("startdate"),
      "La fecha de fin debe de ser mayor a la de inicio"
    ),
});

export default function CourseForm({ setForm, title, defaultValues }) {
  const [isEdit,setIsEdit] = useState(false)
  const [courseId,setCourseId] = useState("");
  const [nParticipants,setNParticipants] = useState(0)
  const navigate = useNavigate()
  const {
    control: controlCourse,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schemaCourse),
  });

  const [partAdded,setPartAdded] = useState(false);

  const getNumberParticipants = async(id)=>{
      let url = `http://localhost:3003/api/participants/count/${id}`;
      try {
        setNParticipants(await(await axios.get(url)).data)
        
      } catch (error) {
        console.log(error);
      }
      
  }
  useEffect(() => {
    defaultValues &&
      defaultValues.defaultValues && 
      setupCourse(defaultValues.defaultValues);
      
     
  }, [defaultValues, reset]);

  const setupCourse = (a)=>{
    setIsEdit(true)
    setCourseId(a.id);
    getNumberParticipants(a.id);
    reset(a)

  }
  useEffect(() => {
    if(defaultValues?.defaultValues?.participantAdded){
     
      setPartAdded(defaultValues.defaultValues.participantAdded);
    }
    
  }, [defaultValues]);
  const onSubmit = data => setForm({...data,id:isEdit ? courseId : ""})
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setPartAdded(false);
  };
  return (
    <>
      <div className="add-form-header">
        <h2>{title}</h2>
      </div>
      <Snackbar anchorOrigin={{ vertical:"top", horizontal:"center" }} open={partAdded} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '80%' }}>
          Se añade alumno !
        </Alert>
        </Snackbar >
      { defaultValues &&
      defaultValues.defaultValues && (<Button
        variant="contained"
        style={{
          backgroundColor: "#22172b",
        }}
        sx={{ mt: 4 }}
        onClick={()=> navigate("/add-participant", {state:{id:defaultValues.defaultValues.id}})}
      >
        Añadir alumnos
      </Button>)}
      <small>Actualmente el curso tiene {nParticipants.count} alumnos.</small>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-contianer">
          <Controller
            name="title"
            control={controlCourse}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="title-input"
                label="Titulo del curso"
                variant="standard"
                error={!!errors.title}
                helperText={errors.title ? errors.title?.message : ""}
              />
            )}
          />
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="startdate"
                control={controlCourse}
                defaultValue={Date.now()}
                render={({
                  field: { onChange, value },
                  fieldState: { error, invalid },
                }) => (
                  <DatePicker
                    label="Inicio del curso"
                    id="startdate"
                    value={value}
                    onChange={(nvalue) => {
                      onChange(nvalue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="startdate"
                        variant="standard"
                        margin="dense"
                        error={!!errors.startdate}
                        helperText={
                          errors.startdate ? errors.startdate?.message : null
                        }
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="enddate"
                control={controlCourse}
                defaultValue={Date.now()}
                render={({
                  field: { onChange, value },
                  fieldState: { error, invalid },
                }) => (
                  <DatePicker
                    label="Fin del curso"
                    id="enddate"
                    value={value}
                    onChange={(nvalue) => {
                      onChange(nvalue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="enddate"
                        variant="standard"
                        margin="dense"
                        error={!!errors.dateend}
                        helperText={
                          errors.dateend ? errors.dateend?.message : null
                        }
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Modalidad</InputLabel>
              <Controller
                name="type"
                control={controlCourse}
                defaultValue={0}
                render={({ field }) => (
                  <Select {...field} label="Modalidad">
                    <MenuItem value={0}>FullTime</MenuItem>
                    <MenuItem value={1}>PartTime</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </ThemeProvider>
          <Button variant="contained" type="submit" sx={{ mt: 4 }}>
            {!isEdit? "Crear" : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </>
  );
}

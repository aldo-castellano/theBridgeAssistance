import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format } from "date-fns";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../assets/formConfi";
import { Controller, useForm } from "react-hook-form";
import { Button, TextField, Select, MenuItem ,InputLabel,FormControl} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schemaCourse = yup.object().shape({
  title: yup
    .string()
    .min(3, "El titulo debe tener un minimo de 3 caracteres")
    .required("Este campo es obligario"),
  startDate: yup.date().required("Es necesario este campo"),
  endDate: yup
    .date()
    .min(
      yup.ref("startDate"),
      "La fecha de fin debe de ser mayor a la de inicio"
    ),
});

export default function CourseForm({ setForm, title }) {
  const {
    control: controlCourse,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCourse),
  });

  const onSubmit = (data) => setForm(data);
  return (
    <>
      <div className="add-form-header">
        <h2>{title}</h2>
      </div>

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
                name="startDate"
                control={controlCourse}
                defaultValue={format(Date.now(), "yyyy-MM-dd")}
                render={({
                  field: { onChange, value },
                  fieldState: { error, invalid },
                }) => (
                  <DatePicker
                    label="Inicio del curso"
                    id="startDate"
                    value={value}
                    onChange={(nvalue) => {
                      onChange(nvalue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="startDate"
                        variant="standard"
                        margin="dense"
                        error={!!errors.dateStart}
                        helperText={
                          errors.dateStart ? errors.dateStart?.message : null
                        }
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={controlCourse}
                defaultValue={format(Date.now(), "yyyy-MM-dd")}
                render={({
                  field: { onChange, value },
                  fieldState: { error, invalid },
                }) => (
                  <DatePicker
                    label="Fin del curso"
                    id="endDate"
                    value={value}
                    onChange={(nvalue) => {
                      console.log(format(nvalue, "yyyy-MM-dd"));
                      onChange(nvalue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="endDate"
                        variant="standard"
                        margin="dense"
                        error={!!errors.dateEnd}
                        helperText={
                          errors.dateEnd ? errors.dateEnd?.message : null
                        }
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
            <FormControl >
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
            )} />
            </FormControl>
              </ThemeProvider>
          <Button variant="contained" type="submit" sx={{ mt: 4 }}>
            Crear
          </Button>
        </div>
      </form>
    </>
  );
}

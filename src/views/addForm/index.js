import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import {DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

// 0 = user   1 = course
const AddForm = (props) => {
  const [type, setType] = useState(0);
  const [course, setCourse] = useState({
    title: "",
    startDate: "",
    endDate: "",
    type: "",
  });
  const [user, setUser] = useState({});

  useEffect(() => {
    if (props.type !== undefined) {
      setType(parseInt(props.type));
    }
  }, []);

  function updateFieldCourse(e,attr){
    setCourse(prevState =>({
      ...prevState,
      [attr]:e.target.value
    }))
  }

  const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const userForm = <>
    <TextField
          required
          id="title"
          label="Nombre del curso"
          onChange={(e)=>updateFieldCourse(e,'title')}
          variant="standard"
        />
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
    
  </>
  return (
    <>
      <div className="add-form-container">
        <h2>AGREGA UN {type ? "USUARIO" : "CURSO"}</h2>
        {userForm}
      </div>
    </>
  );
};


export default AddForm;

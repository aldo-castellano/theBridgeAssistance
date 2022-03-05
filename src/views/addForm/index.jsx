import React , { useState } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

const AddForm = () => {
    const [date,setDate] = useState(Date.now());

    function handleDateChange(dateC){
        setDate(dateC);
    }
  return (<>
      <h2>addForm</h2>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Basic example"
        value={date}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
      </>);
};
export default AddForm;
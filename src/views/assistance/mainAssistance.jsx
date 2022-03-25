import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
const MainAssistance = () => {
  const [clases, setClases] = useState();
  const modelcourses = { titleCourse: "full Stack" };
  const navigate = useNavigate();
  const location = useLocation().state;
  const [assistance, setAssistance] = useState([]);
  console.log(clases,"CLASES MAIN");
  useEffect(() => {
    function classData() {
      try {
        console.log(location, 'LOCATION')
        let courseid = location.id;   
        console.log(courseid,"COURSEID");     
        axios
          .get(`http://localhost:3003/api/class/courseid/${courseid}`)
          .then((res) => {
            console.log(res,"CLASES DATA EN USEFECT");
            orderClass(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
    classData();
  }, []);

  const handleClickGetClass = (event, classItem) => {
    // console.log(classItem);
    navigate("/checkclass", { state: { ...classItem }, mode: false });
  };
  useEffect(() => {
    function assistanceData() {
      try {
        let classid = location.id;
        axios
          .get(`http://localhost:3003/api/assist/classid/${classid}`)
          .then((res) => setAssistance(res.data));
      } catch (error) {
        console.log(error);
      }
    }
    assistanceData();
  }, []);
  const orderClass = (dataClass) => {
    console.log("clases", dataClass);
    dataClass.sort((a, b) => {
      if (a.createdat > b.createdat) {
        return -1;
      } else if (a.createdat < b.createdat) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log(dataClass);
    return setClases(dataClass);
  };

  const newClass = () => {
    console.log("location MainAsistance",location);
    navigate("/addclass", {
      state: { ...clases[0], mode: true, title: location.title, courseid: location.id, assistance: [...assistance] },
    });
  };
  return (
    <>
      <main className="main-assistance container">
        <h1 className="title-main">{location.title}</h1>
        <div className="container-mainAssistance">
          
          {clases?.length >= 1 ? (
            <>
            {console.log(clases)}

              <Box sx={{ minWidth: 100, width: 300 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select class
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select class"
                  >
                    {clases?.map((element) => (
                      <MenuItem
                        key={element.id}
                        onClick={(event) => handleClickGetClass(event, element)}
                      >
                        {element.createdat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </>
          ) : null}
          <div className="new-class" onClick={newClass}></div>
        </div>
      </main>
    </>
  );
};
export default MainAssistance;

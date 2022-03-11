import React, { useState, useEffect } from "react";
import Prueba from "./modelAssistance";
import { Icon } from "@iconify/react";
import { Check } from "@mui/icons-material";
import axios from "axios";
import { Button } from "@mui/material";
// import { modelAssitance, modelcourses } from "./modelAssistance";

const Assistant = () => {
  const [prueba, setPrueba] = useState(Prueba);
  const [clases, setClases] = useState();
  const modelcourses = { titleCourse: "full Stack" };

  useEffect(() => {
    function fecthData() {
      try {
        let courseid = "bfc11207-4f81-4044-ab8d-26dd0f477dd0";
        axios
          .get(`http://localhost:3003/api/class/courseid/${courseid}`)
          .then((res) => orderClass(res.data));
      } catch (error) {
        console.log(error);
      }
    }
    fecthData();
  }, []);

  const orderClass = (dataClass) => {
    dataClass.sort((a, b) => {
      if (a.createdat > b.createdat) {
        return -1;
      } else if (a.createdat < b.createdat) {
        return 1;
      } else {
        return 0;
      }
    });
    return setClases(dataClass);
  };
  // console.log(clases);
  // const onChangeValue = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.target);
  //   const tempAssitance = prueba.map((e, index) => {
  //     return {
  //       name: e.name,
  //       type: data.get(e.name),
  //       coment: data.get(index + "comment"),
  //     };
  //   });
  //   console.log(tempAssitance);
  //   return setPrueba(tempAssitance);
  // };

  const tempAssitance = [...prueba];
  const testt = (event, index, clave) => {
    if (clave === "partial") {
      tempAssitance[index][clave] = event.target.checked;
    } else if (clave === "type" && event.target.value == 2) {
      tempAssitance[index][clave] = event.target.value;
      tempAssitance[index].partial = false;
    } else {
      tempAssitance[index][clave] = event.target.value;
    }
    setPrueba(tempAssitance);
  };
  const handleClickComment = (event) => {
    const comment = document.getElementById(event.target.id + "comment");
    comment.toggleAttribute("hidden");
  };

  // console.log(prueba);
  return (
    <>
      <main className="main container">
        <h1 className="title-main">{modelcourses.titleCourse}</h1>
        {clases?.length > 1 ? (
          <select>
            {clases?.map((element, index) => (
              <option key={index}>
                Clase {index + 1} ({element.createdat.slice(0, 10)})
              </option>
            ))}
          </select>
        ) : null}
        <form className="assistance-form">
          {prueba.map((e, index) => {
            return (
              <div key={index} id={`${index}`} className="item-assistance">
                <p>{e.name}</p>
                <div className="type-assistance">
                  <input
                    className="input-assistance-type"
                    id={`${index} pretencial`}
                    type="radio"
                    defaultChecked={e.type == 0 ? true : false}
                    value={0}
                    name={e.name}
                    onChange={(event) => testt(event, index, "type")}
                  />
                  <label
                    className="pretencial label-assistance"
                    htmlFor={`${index} pretencial`}
                  >
                    <Icon className="icon-assistance" icon="bi:laptop" />
                  </label>

                  <input
                    className="input-assistance-type"
                    defaultChecked={e.type == 1 ? true : false}
                    id={`${index} remote`}
                    type="radio"
                    value={1}
                    name={e.name}
                    onChange={(event) => testt(event, index, "type")}
                  />
                  <label
                    className="pretencial label-assistance"
                    htmlFor={`${index} remote`}
                  >
                    <Icon
                      className="icon-assistance"
                      icon="fa-solid:chalkboard-teacher"
                    />
                  </label>

                  <input
                    className="input-assistance-type"
                    defaultChecked={e.type == 2 ? true : false}
                    id={`${index} absent`}
                    type="radio"
                    value={2}
                    name={e.name}
                    onChange={(event) => testt(event, index, "type")}
                  />

                  <label
                    className="absent label-assistance"
                    htmlFor={`${index} absent`}
                  >
                    <Icon
                      className="icon-assistance"
                      icon="akar-icons:person-cross"
                    />
                  </label>
                </div>
                <div>
                  <button
                    id={index}
                    className={`${index} coment-button`}
                    onClick={handleClickComment}
                    type="button"
                  >
                    <Icon
                      id={index}
                      className="icon-assistance"
                      icon="fa6-regular:note-sticky"
                    />
                  </button>
                  <div
                    id={`${index}comment`}
                    hidden
                    className=" textarea-assistance"
                  >
                    <div className="container-partial">
                      <input
                        id={`${index} partial`}
                        type="checkbox"
                        name={index}
                        checked={e.partial}
                        onChange={(event) => {
                          testt(event, index, "partial");
                        }}
                        hidden={e.type == 2 ? true : false}
                        className="input-partial"
                      ></input>
                      <label
                        hidden={e.type == 2 ? true : false}
                        htmlFor={`${index} partial`}
                        className="label-partial"
                      >
                        Partial
                      </label>
                    </div>
                    <textarea name={index + "comment"}></textarea>
                  </div>
                </div>
              </div>
            );
          })}
          <Button
            // onClick={() => }
            variant="contained"
            size="large"
            sx={{
              paddingX: 10,
              borderRadius: 50,
            }}
            color="secondary"
          >
            guardar
          </Button>
        </form>
      </main>
    </>
  );
};
export default Assistant;

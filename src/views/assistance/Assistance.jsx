import React, { useState } from "react";
import Prueba from "./modelAssistance";
// import { modelAssitance, modelcourses } from "./modelAssistance";

const Assistant = () => {
  const [prueba, setPrueba] = useState(Prueba);
  const [test, setTest] = useState();
  const modelcourses = { titleCourse: "full Stack" };
  const modelClases = [
    "2022-03-03",
    "2022-03-03",
    "2022-03-03",
    "2022-03-03",
    "2022-03-03",
    "2022-03-03",
  ];

  // const tempAssitance = [];
  const onChangeValue = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const tempAssitance = prueba.map((e) => {
      return {
        name: e.name,
        type: data.get(e.name),
        modo: data.get(e.name + "check"),
      };
    });
    console.log(tempAssitance);
    return tempAssitance;
  };
  const testt = (event) => {
    let removes = document.getElementById(`${event.target.id}`);

    console.log(removes);
  };

  return (
    <>
      <main className="main container">
        <h1 className="title-main">{modelcourses.titleCourse}</h1>
        <select>
          {modelClases.map((element, index) => (
            <option key={index}>
              Clase {index + 1} - {element}
            </option>
          ))}
        </select>
        <form onSubmit={onChangeValue}>
          {prueba.map((e, index) => {
            return (
              <div key={index} id={`${index}`} data-hola="hola">
                <div>
                  <p>{e.name}</p>
                  <div>
                    <label className="contenedor">
                      <input
                        className="input"
                        id={`${index}`}
                        type="radio"
                        defaultValue={0}
                        value={0}
                        name={e.name}
                        onClick={testt}
                      />
                      <span> Presential </span>
                    </label>
                    <label className="contenedor">
                      <input
                        id={`${index}`}
                        type="radio"
                        value="1"
                        name={e.name}
                        onClick={testt}
                      />
                      <span> Remote </span>
                    </label>
                    <label className="contenedor">
                      <input
                        id={`${index}`}
                        type="radio"
                        value="2"
                        name={e.name}
                        defaultChecked
                        onClick={testt}
                      />
                      <span> Absent </span>
                    </label>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name={e.name + "check"}
                  value="Partial"
                ></input>
                <p className=" display-none" id={"partial" + index}>
                  esto es una prueba
                </p>
              </div>
            );
          })}
          <button>boton</button>
        </form>
      </main>
    </>
  );
};
export default Assistant;

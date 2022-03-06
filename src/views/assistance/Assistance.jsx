import React from "react";
// import { modelAssitance, modelcourses } from "./modelAssistance";

const assistant = () => {
  const modelcourses = { titleCourse: "full Stack" };
  const modelClases = [
    "2022-03-03",
    "2022-03-03",
    "2022-03-03",
    "2022-03-03",
    "2022-03-03",
    "2022-03-03",
  ];
  return (
    <>
      <main className="main container">
        <h1 className="title-main">{modelcourses.titleCourse}</h1>
        <select>
          {modelClases.map((element, index) => (
            <option>
              Clase {index + 1} - {element}
            </option>
          ))}
        </select>
      </main>
    </>
  );
};
export default assistant;

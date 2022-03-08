import React, { useState } from "react";
import Prueba from "./modelAssistance";
import { Icon } from "@iconify/react";
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
    const tempAssitance = prueba.map((e, index) => {
      return {
        name: e.name,
        type: data.get(e.name),
        coment: data.get(index + "comment"),
      };
    });
    console.log(tempAssitance);
    return tempAssitance;
  };
  const testt = (event) => {
    let removes = document.getElementById(`${event.target.id}`);

    console.log(removes);
  };
  const handleClickComment = (event) => {
    const comment = document.getElementById(event.target.id + "comment");
    comment.toggleAttribute("hidden");
    // console.log(comment);
  };
  const handleClickIcon = (event) => {
    event.stopPropagation();
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
        <form onSubmit={onChangeValue} className="assistance-form">
          {prueba.map((e, index) => {
            return (
              <div key={index} id={`${index}`} className="item-assistance">
                <p>{e.name}</p>
                <div className="type-assistance">
                  <input
                    className="input"
                    id={`${index} pretencial`}
                    type="radio"
                    defaultChecked
                    value={0}
                    name={e.name}
                    onClick={testt}
                  />
                  <label className="pretencial" htmlFor={`${index} pretencial`}>
                    <Icon className="icon-assistance" icon="bi:laptop" />
                  </label>

                  <input
                    id={`${index} remote`}
                    type="radio"
                    value="1"
                    name={e.name}
                    onClick={testt}
                  />
                  <label className="pretencial" htmlFor={`${index} remote`}>
                    <Icon
                      className="icon-assistance"
                      icon="fa-solid:chalkboard-teacher"
                    />
                  </label>

                  <input
                    id={`${index} absent`}
                    type="radio"
                    value="2"
                    name={e.name}
                    onClick={testt}
                  />

                  <label className="absent" htmlFor={`${index} absent`}>
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
                      onClick={handleClickIcon}
                      className="icon-assistance"
                      icon="fa6-regular:note-sticky"
                    />
                  </button>
                  <div
                    id={`${index}comment`}
                    hidden
                    className=" textarea-assistance"
                  >
                    <textarea name={index + "comment"}></textarea>
                  </div>
                </div>
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

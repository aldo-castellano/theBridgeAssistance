import React, { useState, useEffect } from "react";
import { useSession } from "logic/useSession";
import { Icon } from "@iconify/react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getTime } from "date-fns";
const Assistant = (props) => {
  const location = useLocation().state;
  const { user } = useSession();
  const [mode, setMode] = useState(Boolean(location.mode));
  const [participants, setParticipants] = useState([]);
  const [assistance, setAssistance] = useState([]);
  const [model, setModel] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location, "LOCATIONCOMPLETE");
    console.log(location.id, "LOCATIONID");
    if (location.id) {
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
    }
  }, []);

  useEffect(() => {
    function participantData() {
      try {
        let courseid = location.courseid;

        axios
          .get(`http://localhost:3003/api/participants/courseid/${courseid}`)
          .then((res) => {
            console.log("esto son los participantes", res.data);
            setParticipants(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
    participantData();
  }, []);

  const tempModel = [];
  useEffect(() => {
    const modelAssistance = () => {
      if (mode === false) {
        console.log("ASSISTANCE?", assistance);
        console.log("PARTICIPANTS?", participants);
        assistance?.map((asistencia) => {
          const nameParticipant = participants?.filter(
            (item) => asistencia.participantid == item.id
          );

          const modelAlumn = {
            firstname: nameParticipant[0]?.firstname,
            lastname: nameParticipant[0]?.lastname,
            ...asistencia,
          };

          return tempModel.push(modelAlumn);
        });
      } else {
        participants.map((participant) => {
          const modelAlumn = {
            firstname: participant?.firstname,
            lastname: participant?.lastname,
            participantid: participant?.id,
            ispartial: location.ispartial ?? false,
            coments: location.coments ?? null,
            assistance: "0",
          };
          return tempModel.push(modelAlumn);
        });
      }
      setModel(tempModel);
    };
    modelAssistance();
    console.log(mode, "mode");
  }, [participants, assistance]);

  const tempAssitance = [...model];
  const testt = (event, index, clave) => {
    if (clave === "ispartial") {
      tempAssitance[index][clave] = event.target.checked;
    } else if (clave == "assistance" && event.target.value == 2) {
      tempAssitance[index][clave] = event.target.value;
      tempAssitance[index].ispartial = false;
    } else {
      tempAssitance[index][clave] = event.target.value;
    }
    setModel(tempAssitance);
  };
  const handleClickComment = (event) => {
    const comment = document.getElementById(event.target.id + "comment");
    comment.toggleAttribute("hidden");
  };
  const postClassAssistance = async () => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      time: "HH:mm",
    };
    const date = new Date();
    console.log("esta es la fecha que buscamos", date);

    // var arrayDate = event.split("/");
    // console.log(arrayDate);
    // const currentDay = arrayDate[0];
    // const currentMonth = arrayDate[1];
    // const currentYear = arrayDate[2];
    // const currentDate = `${currentYear}/${currentMonth}/${currentDay}`;

    const postClass = {
      courseid: location.courseid,
      userid: user[0],
      createdat: date,
    };

    let axiosClass = await axios.post(
      "http://localhost:3003/api/class/add",
      postClass
    );
    model.map(async (item) => {
      await axios.post("http://localhost:3003/api/assist/add", {
        classid: axiosClass.data[0].id,
        ...item,
      });
    });
    navigate("/courses");
  };
  console.log(model, "EL MODELO ANTES DEL RENDER");
  return (
    <>
      <main className="main container">
        <h1>{location.title}</h1>
        <form className="assistance-form">
          {model?.map((e, index) => {
            console.log(e, "E DENTRO DEL MAP");
            return (
              <div key={index} id={`${index}`} className="item-assistance">
                <p>{e.firstname + " " + e.lastname}</p>
                <div className="type-assistance">
                  <input
                    className="input-assistance-type"
                    id={`${index} pretencial`}
                    type="radio"
                    disabled={mode == false ? true : false}
                    defaultChecked={e.assistance == 0 ? true : false}
                    value={0}
                    name={index}
                    onChange={(event) => testt(event, index, "assistance")}
                  />
                  <label
                    className="pretencial label-assistance"
                    htmlFor={`${index} pretencial`}
                  >
                    <Icon className="icon-assistance" icon="bi:laptop" />
                  </label>

                  <input
                    className="input-assistance-type"
                    defaultChecked={e.assistance == 1 ? true : false}
                    id={`${index} remote`}
                    type="radio"
                    disabled={mode == false ? true : false}
                    value={1}
                    name={index}
                    onChange={(event) => testt(event, index, "assistance")}
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
                    defaultChecked={e.assistance == 2 ? true : false}
                    id={`${index} absent`}
                    type="radio"
                    disabled={mode == false ? true : false}
                    value={2}
                    name={index}
                    onChange={(event) => testt(event, index, "assistance")}
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
                        disabled={mode == false ? true : false}
                        checked={e.ispartial}
                        onChange={(event) => {
                          testt(event, index, "ispartial");
                        }}
                        hidden={e.assistance == 2 ? true : false}
                        className="input-partial"
                      ></input>
                      <label
                        hidden={e.assistance == 2 ? true : false}
                        htmlFor={`${index} partial`}
                        className="label-partial"
                      >
                        Partial
                      </label>
                    </div>
                    <textarea
                      disabled={mode == false ? true : false}
                      name={index + "coments"}
                      onChange={(event) => {
                        testt(event, index, "coments");
                      }}
                    ></textarea>
                    {/* {console.log(e.ispartial)} */}
                  </div>
                </div>
              </div>
            );
          })}
          {mode === false ? null : (
            <div>
              <Button
                onClick={postClassAssistance}
                variant="contained"
                disabled={participants < 1 ? true : false}
                size="large"
                sx={{
                  paddingX: 10,
                  borderRadius: 50,
                }}
                color="secondary"
              >
                guardar
              </Button>
            </div>
          )}
          {participants < 1 ? (
            <p className="participants">
              Todavía no se han añadido participantes al curso
            </p>
          ) : null}
        </form>
      </main>
    </>
  );
};
export default Assistant;

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { Button } from "@mui/material";
import {
  HolidayVillageTwoTone,
  HotelTwoTone,
  LocalConvenienceStoreOutlined,
} from "@mui/icons-material";

const Assistant = (props) => {
  const [mode, setMode] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [assistance, setAssistance] = useState([]);
  const [model, setModel] = useState([]);

  useEffect(() => {
    function participantData() {
      try {
        let courseid = "bfc11207-4f81-4044-ab8d-26dd0f477dd0";
        axios
          .get(`http://localhost:3003/api/participants/courseid/${courseid}`)
          .then((res) => setParticipants(res.data));
      } catch (error) {
        console.log(error);
      }
    }
    participantData();
  }, []);
  useEffect(() => {
    function assistanceData() {
      try {
        let classid = "67d62554-8dc6-480f-b177-ece71027ad06";
        axios
          .get(`http://localhost:3003/api/assist/classid/${classid}`)
          .then((res) => setAssistance(res.data));
      } catch (error) {
        console.log(error);
      }
    }
    assistanceData();
  }, []);
  const chao = [];
  useEffect(() => {
    const modelAssistance = () => {
      assistance.map((asistencia) => {
        const nameParticipant = participants.filter(
          (item) => asistencia.participantid == item.id,
        );

        const modelAlumn = {
          firstname: `${nameParticipant[0]?.firstname}`,
          lastname: `${nameParticipant[0]?.lastname}`,
          ...asistencia,
        };

        return chao.push(modelAlumn);
      });
      setModel(chao);
    };
    modelAssistance();
  }, [assistance]);

  //   modelAssistance(assistance);
  //   const mapParticipantsName = (assistance) => {
  //     const nameParticipant = participants.filter(
  //       (item) => assistance.participantid == item.id,
  //     );
  //     console.log(nameParticipant);
  //     return nameParticipant[0];
  //   };

  //   console.log(clases);
  //   const onChangeValue = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.target);
  //     const tempAssitance = participants.map((e, index) => {
  //       return {
  //         name: e.name,
  //         type: data.get(e.name),
  //         coment: data.get(index + "comment"),
  //       };
  //     });
  //     console.log(tempAssitance);
  //     return setParticipants(tempAssitance);
  //   };

  const tempAssitance = [...model];
  const testt = (event, index, clave) => {
    if (clave === "ispartial") {
      tempAssitance[index][clave] = event.target.checked;
    } else if (clave === "assistance" && event.target.value == 2) {
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
  console.log(model);
  return (
    <>
      <main className="main container">
        <form className="assistance-form">
          {model?.map((e, index) => {
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
                    <textarea
                      disabled={mode == false ? true : false}
                      name={index + "coments"}
                      onChange={(event) => {
                        testt(event, index, "coments");
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
            );
          })}
          {mode == false ? null : (
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
          )}
        </form>
      </main>
    </>
  );
};
export default Assistant;

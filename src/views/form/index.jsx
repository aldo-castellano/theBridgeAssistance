import React, { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";
import CourseForm from "components/forms/CourseForm";
import UserForm from "components/forms/UserForm";
import ParticipantForm from "components/forms/ParticipantForm";
import axios from "axios";
import { format } from "date-fns";

const Form = () => {
  const [formType, setFormType] = useState(0);
  const [defaultValues, setDefaultValues] = useState(null);
  const location = useLocation();
  const { pathname } = location;
  const [postDone, setPostDone] = useState(false);
  const [formState, setFormState] = useState(null);
  const [title, setTitle] = useState("");



  //INICIO FUNCIONES DE INICIALIZACION

  //Definimos tipo de form recogiendo pathname
  useEffect(() => {
    setFormType(getTypeForm(pathname));
  }, [pathname]);

  useEffect(() => {
    if (formState != null) {
      switch (formType) {
        case 0:
          createUser();
          break;
        case 1:
          createCourse();
          break;
        case 2:
          createParticipant();
          break;
        default:
          break;
      }
    }
  }, [formState]);

  //Funcion que se envia a los forms hijos para recoger la info y hacer la peticion
  const updateStateForm = (newdata) => {
    setFormState(newdata);
  };
  const createUser = async () => {
    const url = "http://localhost:3003/api/user/add";
    try {
      const response = await axios.post(url, formState);
      console.log("Se realiza post correctamente", response);
      setPostDone(true);
    } catch (error) {
      console.log(error);
    }
  };
  const createCourse = async () => {
    let url = "http://localhost:3003/api/course/add";
    try {
      let tempObj = {
        title: formState.title,
        startdate: format(formState.startdate, "yyyy-MM-dd"),
        enddate: format(formState.enddate, "yyyy-MM-dd"),
        type: formState.type === 0 ? false : true,
      };
      const response = await axios.post(url, tempObj);
      console.log("Se realiza post correctamente", response);
      setPostDone(true);
    } catch (error) {
      console.log(error);
    }
  };
  const createParticipant = async () => {
    let url = "http://localhost:3003/api/participants/add";
    try {
      let tmpObj = {
        ...formState,
        createdat: format(Date.now(), "yyyy-MM-dd"),
      };
      const response = await axios.post(url, tmpObj);
      console.log("Se realiza post correctamente", response);
      setPostDone(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async() =>{
    let url = `http://localhost:3003/api/user/id/${location.state.id}`
    
     try {
       const data = await axios.get(url);
       setDefaultValues({defaultValues:{
          firstname : data.data.firstname,
          lastname:data.data.lastname,
          login: data.data.login,
          email:data.data.email
       }})

     } catch (error) {
       console.log("Error en getUser form",error);
     }
  }
  //Funcion que define por path que tipo de formulario mostrar
  function getTypeForm(path) {
    switch (path) {
      case "/add-user":
        setTitle("AGREGAR UN USUARIO");
        return 0;
      case "/add-course":
        setTitle("AGREGAR UN CURSO");
        return 1;
      case "/add-participant":
        setTitle("AGREGAR UN ALUMNO");
        return 2;
      case "/edit-user":
        getUser();
        setTitle("EDITAR USUARIO");
        return 3;
      case "/edit-course":
        setTitle("EDITAR CURSO");

        return 4;
      case "/edit-participant":
        setTitle("EDITAR ALUMNO");
        return 4;
      default:
        setTitle("ERROR");
        break;
    }
  }

  const propsForm = {
    title: title,
    setForm: updateStateForm,
    defaultValues:defaultValues
  };
  //INICIO RENDER
  return (
    <div className="add-form">
      {postDone ? (
        <h1>POST DONE</h1>
      ) : formType === 0 ? (
        <UserForm {...propsForm} />
      ) : formType === 1 ? (
        <CourseForm {...propsForm} />
      ) : formType === 2 ? (
        <ParticipantForm {...propsForm} />
      ) : formType === 3 ? (
        <UserForm {...propsForm}  />
      ) : formType === 4 ? (
        <CourseForm {...propsForm}  />
      ) : formType === 5 ? (
        <ParticipantForm {...propsForm} />
      ) : (
        ""
      )}
    </div>
  );
};

//FIN RENDER
export default Form;

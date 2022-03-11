import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CourseForm from "components/forms/CourseForm";
import UserForm from "components/forms/UserForm";
import ParticipantForm from "components/forms/ParticipantForm";
import axios from "axios";
import { format } from "date-fns";



const Form = () => {
  const [formType, setFormType] = useState(0);
  const { pathname } = useLocation();
  const [postDone,setPostDone] = useState(false);
  const [formState,setFormState] = useState(null);
  const [title,setTitle] = useState("");
  
  console.log("FormState",formState);

  //INICIO FUNCIONES DE INICIALIZACION

  //Definimos tipo de form recogiendo pathname
  useEffect(() => {
    setFormType(getTypeForm(pathname));
  }, [pathname]);
  useEffect(() => {
    if(formState != null){
      switch (formType) {
        case 0:
          createUser();
          break;
        case 1:
          createCourse();
          break;
        default:
          break;
      }
    }
   
  }, [formState]);
  //Funcion que se envia a los forms hijos para recoger la info y hacer la peticion
 const updateStateForm = (newdata)=>{
      setFormState(newdata);
  }
const createUser = async ()=>{
  const url = "http://localhost:3003/api/user/add";
  try {
    const response = await axios.post(url,formState);
    console.log("Se realiza post correctamente",response)
    setPostDone(true)
  } catch (error) {
    console.log(error)
  }
  

}
const createCourse = async ()=>{
  const url = "http://localhost:3003/api/course/add";
  try {
    let tempObj = {
      title:formState.title,
      startdate:format(formState.startdate,"yyyy-MM-dd"),
      enddate:format(formState.enddate,"yyyy-MM-dd"),
      type:formState.type === 0 ? false : true 
    }
    const response = await axios.post(url,tempObj);
    console.log("Se realiza post correctamente",response)
    setPostDone(true)
  } catch (error) {
    console.log(error)
  }
  

}
  //Funcion que define por path que tipo de formulario mostrar
  function getTypeForm(path) {
    switch (path) {
      case "/add-user":
        setTitle("AGREGAR UN USUARIO")
        return 0;
      case "/add-course":
        setTitle("AGREGAR UN CURSO")
        return 1;
      case "/add-participant":
          setTitle("AGREGAR UN ALUMNO")
          return 2;
      case "/edit-user":
        setTitle("EDITAR ALUMNO")
        return 3;
      case "/edit-course":
        setTitle("EDITAR UN CURSO")
        return 4;
      default:
        setTitle("ERROR")
        break;
    }
  }

  const propsForm = {
    title:title,
    setForm:updateStateForm
  }
//INICIO RENDER
  return (
    <div className="add-form">
        {postDone ? <h1>POST DONE</h1> : formType === 0 ? 
        <UserForm  {...propsForm} /> : formType === 1 ? 
        <CourseForm {...propsForm} />:
        <ParticipantForm {...propsForm} />
      }
    </div>
  );
};

//FIN RENDER
export default Form;

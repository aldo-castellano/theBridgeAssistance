import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CourseForm from "components/forms/CourseForm";
import UserForm from "components/forms/UserForm";


const Form = () => {
  const [formType, setFormType] = useState(0);
  const { pathname } = useLocation();
  const [formState,setFormState] = useState();
  const [title,setTitle] = useState("");
  
  console.log("FormState",formState);

  //INICIO FUNCIONES DE INICIALIZACION

  //Definimos tipo de form recogiendo pathname
  useEffect(() => {
    setFormType(getTypeForm(pathname));
  }, [pathname]);

 const updateStateForm = (newdata)=>{
      setFormState(newdata);
  }

  //Funcion que define por path que tipo de formulario mostrar
  function getTypeForm(path) {
    switch (path) {
      case "/add-user":
        setTitle("AGREGAR UN ALUMNO")
        return 0;
      case "/add-course":
        setTitle("AGREGAR UN CURSO")
        return 1;
      case "/edit-user":
        setTitle("MODIFICAR UN ALUMNO")
        return 2;
      case "/edit-course":
        setTitle("MODIFICAR UN CURSO")
        return 3;
      default:
        setTitle("ERROR")
        break;
    }
  }

  //INICIO RENDER
  return (
    <div className="add-form">
        {formType === 0 ? <UserForm title={title} setForm={updateStateForm}  /> : <CourseForm title={title} setForm={updateStateForm}/>}
    </div>
  );
};
//FIN RENDER
export default Form;

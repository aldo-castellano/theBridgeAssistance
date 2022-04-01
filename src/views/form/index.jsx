import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { format } from "date-fns";

import CourseForm from "components/forms/CourseForm";
import UserForm from "components/forms/UserForm";
import ParticipantForm from "components/forms/ParticipantForm";

const Form = () => {
  const [formType, setFormType] = useState(0);
  const [defaultValues, setDefaultValues] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [formState, setFormState] = useState(null);
  const [title, setTitle] = useState("");

  //Declares type of form depending on pathname
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
        case 3:
          editUser();
          break;
        case 4:
          editCourse();
          break;
        case 5:
          editParticipant();
          break;
        default:
          break;
      }
    }
  }, [formState]);

  //This function decides which form to render according to path
  function getTypeForm(path) {
    switch (path) {
      case "/add-user":
        setTitle("AGREGAR UN USUARIO");
        return 0;
      case "/add-course":
        setTitle("AGREGAR UN CURSO");
        return 1;
      case "/add-participant":
        setParticipant();
        setTitle("AGREGAR UN ALUMNO");
        return 2;
      case "/edit-user":
        getUser();
        setTitle("EDITAR USUARIO");
        return 3;
      case "/edit-course":
        getCourse();
        setTitle("EDITAR CURSO");
        return 4;
      case "/edit-participant":
        getParticipant();
        setTitle("EDITAR ALUMNO");
        return 5;
      default:
        setTitle("ERROR");
        break;
    }
  }

  //This function is passed to children components in order to lift the state up and get the info from the forms
  const updateStateForm = (newdata) => {
    setFormState(newdata);
  };

  const createUser = async () => {
    const url = "http://localhost:3003/api/user/add";
    try {
      const response = await axios.post(url, formState);
      navigate('/user-list');
    } catch (error) {
      console.log(error);
    }
  };

  const createCourse = async () => {
    const url = "http://localhost:3003/api/course/add";
    try {
      const tempObj = {
        title: formState.title,
        startdate: format(formState.startdate, "yyyy-MM-dd"),
        enddate: format(formState.enddate, "yyyy-MM-dd"),
        type: formState.type === 0 ? false : true,
      };
      const response = await axios.post(url, tempObj);
      navigate('/courses')
    } catch (error) {
      console.log(error);
    }
  };

  const createParticipant = async () => {
    const url = "http://localhost:3003/api/participants/add";
    try {
      const tmpObj = {
        ...formState,
        createdat: format(Date.now(), "yyyy-MM-dd"),
      };
      await axios.post(url, tmpObj);
      navigate(`/view-participants/course/${location.state.id}`, {
        state: {
          id: location.state.id,
          participantAdded: true
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async () => {
    const url = "http://localhost:3003/api/user/update";
    try {
      await axios.patch(url, formState);
      navigate("/user-list")
    } catch (error) {
      console.log(error);
    }
  }

  const editParticipant = async () => {
    const url = "http://localhost:3003/api/participants/update";
    try {
      await axios.patch(url, formState);
      navigate(`/view-participants/course/${location.state.courseId}`, {
        state: {
          id: location.state.id,
          participantAdded: true
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const editCourse = async () => {
    const url = "http://localhost:3003/api/course/update";
    try {
      await axios.patch(url, formState);
      navigate("/courses")
    } catch (error) {
      console.log(error);
    }
  }

  const getUser = async () => {
    const url = `http://localhost:3003/api/user/id/${location.state.id}`
    try {
      const data = await axios.get(url);
      setDefaultValues({
        defaultValues: {
          firstname: data.data.firstname,
          lastname: data.data.lastname,
          login: data.data.login,
          email: data.data.email,
          id: data.data.id
        }
      })
    } catch (error) {
      console.log("Error en getUser form", error);
    }
  }

  const getCourse = async () => {
    const url = `http://localhost:3003/api/course/id/${location.state.id}`
    try {
      const data = await axios.get(url);
      setDefaultValues({
        defaultValues: {
          id: data.data.id,
          title: data.data.title,
          startdate: data.data.startdate,
          enddate: data.data.enddate,
          participantAdded: location.state?.participantAdded

        }
      })
    } catch (error) {
      console.log("Error en getUser form", error);
    }
  }

  const getParticipant = async () => {
    const url = `http://localhost:3003/api/participants/all`
    try {
      const response = await axios.get(url);
      const allParticipants = response.data;
      const participant = allParticipants.filter((participant) => participant.id == location.state.participantId);

      setDefaultValues({
        defaultValues: {
          id: participant[0].id,
          firstname: participant[0].firstname,
          lastname: participant[0].lastname,
          courseid: participant[0].courseid
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const setParticipant = () => {
    setDefaultValues({
      defaultValues: {
        courseid: location.state.id,
      }
    })
  }

  const propsForm = {
    title: title,
    setForm: updateStateForm,
    defaultValues: defaultValues
  };
  
  return (
    <div className="add-form">
      {formType === 0 ? (
        <UserForm {...propsForm} />
      ) : formType === 1 ? (
        <CourseForm {...propsForm} />
      ) : formType === 2 ? (
        <ParticipantForm {...propsForm} />
      ) : formType === 3 ? (
        <UserForm {...propsForm} />
      ) : formType === 4 ? (
        <CourseForm {...propsForm} />
      ) : formType === 5 ? (
        <ParticipantForm {...propsForm} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Form;

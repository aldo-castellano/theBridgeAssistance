import { useSession } from "logic/useSession";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userCourses from "services/usercourses";
import adminCourses from "services/admincourses";

export const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [admin, setAdmin] = useState([]);
    //Wait for user
  const { user } = useSession();  
  const userid = user ? user[0] : "null";

  useEffect(async () => {
    typeof user == "object" && setAdmin(user[1]);    
  }, [user, useSession()]);

  useEffect(async () => {
    if (admin == "admin") setCourses(await adminCourses())           
    else if (admin !== "admin") setCourses(await userCourses(userid)) 
  }, [admin]);
  
  useEffect(async () => {          
    if (courses.length == 1 && admin !== "admin")    
      navigate("/class", {
        state: { id: courses[0].id,  title: courses[0].title },
      });
  }, [courses]);
console.log(courses,"COURSES");
  const handleClick = (id, title) => {
    if (admin == "admin") navigate("/edit-course", { state: { id, title } });
    else navigate("/class", { state: { id: courses[0].id,  title: courses[0].title  } });
  };
console.log(courses,"COURSES");
  return (
    <>
      <h2 className="title">MIS CURSOS</h2>
      <div className="courses-container">
        {admin == "admin" && (
          <section
            onClick={() => navigate("/add-course")}
            className="course plus"
          >
            <p>+</p>
          </section>
        )}
        {courses.length > 1 &&
          courses.map(({ id, title }, i) => (
            <section            
              key={`course-${i}`}
              onClick={() => handleClick(id, title)}
              className="course"
            >              
              <p>{title}</p>
            </section>
          ))}
        {courses.length == 0 && (
          <h1 className="no-course">
            Ups! Parece que aun no hay cursos disponibles...
          </h1>
        )}
      </div>
    </>
  );
};

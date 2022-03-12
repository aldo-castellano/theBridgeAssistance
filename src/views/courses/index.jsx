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
  const userid = typeof user == "string" ? user.split(",")[0] : "null";

  useEffect(() => {
    setAdmin(typeof user == "string" ? user.split(",")[1] : "");
  }, [user, useSession()]);

  useEffect(async () => {
    if (admin == "admin") setCourses(await adminCourses());
    else setCourses(await userCourses(userid));
    if (courses.length == 1)
      navigate("/class", {
        state: { courseid: courses[0].id, title: courses[0].title },
      });
  }, [admin]);

  const handleClick = (id, title) => {
    if (admin == "admin") navigate("/edit-course", { state: { id, title } });
    else navigate("/class", { state: { courseid: id, title } });
  };

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

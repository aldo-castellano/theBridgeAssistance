import { useSession } from "logic/useSession";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userCourses from "services/usercourses";
import adminCourses from "services/admincourses";

export const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [admin, setAdmin] = useState([]);
  const { user } = useSession();
  const userid = user ? user[0] : "null";

  useEffect(async () => {
    (typeof user == "object" && user !== null) && setAdmin(user[1]);
  }, [user, useSession()]);

  useEffect(async () => {
    if (admin == "admin") {
      setCourses(await adminCourses());
    } else if (userid != null && userid.length > 1) {
      const coursesResponse = await userCourses(userid);
      setCourses(coursesResponse);
    }
  }, [admin]);

  useEffect(() => {
    console.log(courses, 'sourses')
    if (courses.length == 1) {
      navigate("/class", {
        state: { id: courses[0].id, title: courses[0].title },
      });
    }
  }, [courses])
  
  const handleClick = (id, title) => {
    console.log(id, 'id')
    if (!admin == "admin") navigate("/edit-course", { state: { id, title } });
    else navigate("/class", { state: { id: id, title } });
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

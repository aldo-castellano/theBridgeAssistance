import Context from "context/UserContext";
import { useSession } from "logic/useSession";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userCourses from "services/usercourses";
import adminCourses from "services/admincourses";
import axios from "axios";

export const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  //Wait for user
  const { user } = useContext(Context);
  const admin = typeof user == "string" ? user.split(",")[1] == "admin" : false;
  const userid = typeof user == "string" ? user.split(",")[0] : "null";

  useEffect(async () => {
    if (admin) setCourses(await adminCourses());
    else setCourses(userCourses(userid));
  }, [admin]);

  const handleClick = (id, title) => {
    if (!admin) navigate("/edit-course", { state: { id, title } });
    else navigate("/class", { state: { id, coursename: title } });
  };

  return (
    <>
      <h2 className="title">MIS CURSOS</h2>
      <div className="courses-container">
        {admin && (
          <section
            onClick={() => navigate("/add-course")}
            className="course plus"
          >
            <p>+</p>
          </section>
        )}
        {courses[0] &&
          courses.map(({ id, title }, i) => (
            <section
              key={`course-${i}`}
              onClick={() => handleClick(id, title)}
              className="course"
            >
              <p>{title}</p>
            </section>
          ))}
      </div>
    </>
  );
};

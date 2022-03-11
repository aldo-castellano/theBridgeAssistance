import Context from "context/UserContext";
import { useSession } from "logic/useSession";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usercourse from "services/usercourses";

let courses = [
  { name: "Full-Stack Intensivo", user: "richi" },
  { name: "Full-Stack Part-time", user: "richi" },
  { name: "Full-Stack Part-time", user: "richi" },
  { name: "Cyber Intensivo", user: "richard" },
  { name: "Cyber Intensivo", user: "richard" },
  { name: "Cyber Part-time", user: "richard" },
];
let user = window.location.href;
// user = user.substring(user.lastIndexOf("/") + 1);
courses = courses.filter((course) => course.user == user);

export const Courses = () => {
  const navigate = useNavigate();
  const { isLogged, logout } = useSession();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  const { user } = useContext(Context);
  const userid = user.split(",")[0];
  const courses = usercourse({ userid });
  //User idenfification
  //fetch courses based on user
  //section generation based on database
  //? course creation only for admins
  //? course asignement to users

  return (
    <>
      <h2 className="title">MIS CURSOS</h2>
      <div className="courses-container">
        <section onClick={() => navigate("/")} className="course plus">
          <p>+</p>
        </section>
        {courses.map((course, id) => (
          <section
            key={`course-${id}`}
            onClick={() => navigate("/")}
            className="course"
          >
            <p>{course.name}</p>
          </section>
        ))}
      </div>
    </>
  );
};

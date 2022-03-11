import Context from "context/UserContext";
import { useSession } from "logic/useSession";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usercourse from "services/usercourses";

export const Courses = () => {
  const navigate = useNavigate();
  const { isLogged, logout } = useSession();

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  const { user } = useContext(Context);
 
  const userid = user.split(",")[0];
  const courses = usercourse(userid);
  //? course creation only for admins
  //? course asignement to users

  return (
    <>
      <h2 className="title">MIS CURSOS</h2>
      <div className="courses-container">
        <section onClick={() => navigate("/")} className="course plus">
          <p>+</p>
        </section>
        {courses[0] && courses.map(({ id, title }, i) => (
          <section
            key={`course-${i}`}
            onClick={() => navigate("/", { state: { id, title } })}
            className="course"
          >
            <p>{title}</p>
          </section>
        ))}
      </div>
    </>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";
let courses = [
  { name: "Full-Stack Intensivo", user: "richi" },
  { name: "Full-Stack Part-time", user: "richi" },
  { name: "Full-Stack Part-time", user: "richi" },
  { name: "Cyber Intensivo", user: "richard" },
  { name: "Cyber Intensivo", user: "richard" },
  { name: "Cyber Part-time", user: "richard" },
];
let user = window.location.href;
user = user.substring(user.lastIndexOf("/") + 1);
console.log(user);
courses = courses.filter((course) => course.user == user);

export const Courses = () => {
  //User idenfification
  //fetch courses based on user
  //section generation based on database
  //? course creation only for admins
  //? course asignement to users

  const navigate = useNavigate();

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

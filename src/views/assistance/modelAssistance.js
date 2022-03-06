class modelCourses {
  courseid;
  titleCourse;
  userId;
}
class modelAssitance {
  clasesid;
  createdAt;
  participantid;
  lastName;
  firstName;
  isPartial;
  coments;
  assistance;
  constructor() {}
}

export { modelCourses, modelAssitance };

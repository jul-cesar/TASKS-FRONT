export const privateRoutes = {
  TASKS: `/:user/:teamid`,
  ASIGNEDTASKS: "/asigned-tasks",
  TEAMCONF: "/team/:idTeam",
  PROFILE: "/user/:id"

};

export const publicRoutes = {
  LOGIN: "/login",
  REGISTER: "/register",
};

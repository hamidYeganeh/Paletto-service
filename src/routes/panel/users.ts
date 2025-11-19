import type { FastifyPluginCallback } from "fastify";
import createUserRoute from "./users/create";
import getUserRoute from "./users/getById";
import updateUserRoute from "./users/updateById";
import deleteUserRoute from "./users/deleteById";

const panelUsersRoutes: FastifyPluginCallback = (app, _opts, done) => {
  app.register(createUserRoute);
  app.register(getUserRoute);
  app.register(updateUserRoute);
  app.register(deleteUserRoute);
  done();
};

export default panelUsersRoutes;

import Fastify from "fastify";
import panelUsersRoutes from "./routes/panel/users";

const app = Fastify({ logger: true });

app.register(panelUsersRoutes, { prefix: "/api/v1/panel/users" });

const port = Number(process.env.PORT || 50001);
app
  .listen({ port, host: "0.0.0.0" })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });

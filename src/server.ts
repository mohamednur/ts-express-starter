import App from "./index";
import IndexRoutes from "./routes/index.route";
import UsersRoute from "./routes/users.route";
const app = new App([new IndexRoutes(), new UsersRoute()]);

app.listen();

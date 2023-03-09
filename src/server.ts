import App from "./index";
import IndexRoutes from "./routes/index.route";
const app = new App([new IndexRoutes()]);

app.listen();

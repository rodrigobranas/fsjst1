import GetBoard from "./application/GetBoard";
import GetBoards from "./application/GetBoards";
import AuthController from "./infra/controller/AuthController";
import BoardController from "./infra/controller/BoardController";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ExpressHttp from "./infra/http/ExpressHttp";
import BoardRepositoryDatabase from "./infra/repository/database/BoardRepositoryDatabase";
import UserRepositoryMemory from "./infra/repository/memory/UserRepositoryMemory";

const http = new ExpressHttp();

const connection = new PgPromiseConnection();
const boardRepository = new BoardRepositoryDatabase(connection);
const boardController = new BoardController(http, boardRepository);
boardController.init();
const userRepository = new UserRepositoryMemory();
const authController = new AuthController(http, userRepository);
authController.init();

http.listen(8000);

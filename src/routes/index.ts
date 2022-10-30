import { Router } from "express";
import userRouter from "./user.routes";
import piuRouter from "./piu.routes";

const routes = Router();

routes.use('/users', userRouter)
routes.use('/pius', piuRouter)

export default routes;
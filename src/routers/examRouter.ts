import {Router} from "express";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import examSchema from "../schemas/examSchema";

const examRouter = Router();

examRouter.use(validateToken())
examRouter.post('/exams', validateSchema(examSchema));
examRouter.get('/exams/subject');
examRouter.get('/exams/teacher');

export default examRouter;
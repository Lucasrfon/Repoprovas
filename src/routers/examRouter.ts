import {Router} from "express";
import { registerNewExam } from "../controllers/examController";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import examSchema from "../schemas/examSchema";

const examRouter = Router();

examRouter.use(validateToken())
examRouter.post('/exams', validateSchema(examSchema), registerNewExam);
examRouter.get('/exams/subject');
examRouter.get('/exams/teacher');

export default examRouter;
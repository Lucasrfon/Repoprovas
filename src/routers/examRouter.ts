import {Router} from "express";
import { getExamsGroupByDiscipline, registerNewExam } from "../controllers/examController";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import examSchema from "../schemas/examSchema";

const examRouter = Router();

examRouter.use(validateToken())
examRouter.post('/exams', validateSchema(examSchema), registerNewExam);
examRouter.get('/exams/discipline', getExamsGroupByDiscipline);
examRouter.get('/exams/teacher');

export default examRouter;
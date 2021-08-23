import express, { Request, Response } from 'express';
import { LogicController } from './app/Controllers/logic-controller';


// Question 1 response
/*
const question_1 = async () => {
    let refund_service = new RefundService();
    let response = await refund_service.refund("573839293", "573839293", 200);

    console.log(response);
}

question_1();
*/


// Question 2
const app = express();

app.use(express.json());

app.post('/', (req: Request, res: Response) => {
    const logicController = new LogicController();
    logicController.performLogic(req, res);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});



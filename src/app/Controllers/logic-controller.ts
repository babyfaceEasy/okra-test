import { LogicService } from "../Services/logic-service";
import { Request, Response } from "express";

export class LogicController {

    private logicService: LogicService;
    constructor() {
        this.logicService = new LogicService()
    }


    performLogic = async (req: Request, res: Response) => {
        let username: string = req.body.username ?? null;
        let password: string = req.body.password ?? null;

        if( (username == null || password == null) ||
            (username.length == 0 || password.length == 0)
        ){
            res.status(400).json({
                'status': 'error',
                'message': 'Please enter both the username and password to continue',
                'data': {}
            });
            return;
        }

        // call logic service
        const logicService = new LogicService();
        let response = await this.logicService.logic(username, password);
        if (response['status'] == 'error'){
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    }
}
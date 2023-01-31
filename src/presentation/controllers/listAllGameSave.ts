import { GameSaveInterface } from "../../data/interfaces/gameSave";
import { ListAllGamesSavesUseCase } from "../../data/useCases/listAllGamesSaves";
import { ControllerImp } from "../interfaces/controller";
import { HTTPRequest, HTTPResponse } from "../interfaces/http";


export interface ListAllGameSaveControllerRes{
    gameSaves:GameSaveInterface[]
}

export class ListAllGameSaveController implements ControllerImp{

    constructor(private readonly useCase:ListAllGamesSavesUseCase){}

    async exec(req: HTTPRequest) : Promise<HTTPResponse<ListAllGameSaveControllerRes,Error>>{
        const res = await this.useCase.exec()
        if(res.left) return {status:res.left.code,error: res.left}
        return {status:200,body:{gameSaves:res.right.gamesSaves}}
    }

}
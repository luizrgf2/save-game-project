import { GameSaveInterface } from "../../data/interfaces/gameSave";
import { CreateGameSaveUseCase } from "../../data/useCases/createGameSave";
import { ControllerImp } from "../interfaces/controller";
import { HTTPRequest, HTTPResponse } from "../interfaces/http";

export interface CreateGameSaveControllerReq{
    nameGame:string,
    directory:string,
    provider:"onedrive"|"drive"
}

export interface CreateGameSaveControllerRes extends GameSaveInterface{}

export class CreateGameSaveController implements ControllerImp{

    constructor(private readonly useCase:CreateGameSaveUseCase){}

    async exec(req: HTTPRequest<CreateGameSaveControllerReq>) : Promise<HTTPResponse<CreateGameSaveControllerRes,Error>>{
        if(!req.body) return {status:422,error:new Error("Erro, os campos não podem estar vázios!")}
        const res = await this.useCase.exec({
            gameSave:{
                directorySaveGame:req.body?.directory,
                nameGame:req.body.nameGame,
                provider:req.body.provider,
            }
        })
        if(res.left) return {status:res.left.code,error: res.left}
        return {status:201,body:{
            ...res.right.gameSave,
            id:res.right.gameSave.id||""
        }}
    }

}
import { GameSaveInterface } from "../../data/interfaces/gameSave";
import { DeleteGameSaveUseCase } from "../../data/useCases/deleteGameSave";
import { ControllerImp } from "../interfaces/controller";
import { HTTPRequest, HTTPResponse } from "../interfaces/http";

export interface DeleteGameSaveControllerReq{
    idProvider:string,
    gameName:string,
    provider:"drive"|"onedrive"
}

export interface DeleteGameSaveControllerRes extends GameSaveInterface{}

export class DeleteGameSaveController implements ControllerImp{

    constructor(private readonly useCase:DeleteGameSaveUseCase){}

    async exec(req: HTTPRequest<DeleteGameSaveControllerReq>) : Promise<HTTPResponse<undefined,Error>>{
        if(!req.body) return {status:422,error:new Error("Erro, os campos não podem estar vázios!")}
        const res = await this.useCase.exec({
            idProvider:req.body.idProvider,
            nameGame:req.body.gameName,
            provider:req.body.provider
        })
        if(res.left) return {status:res.left.code,error: res.left}
        return {status:200}
    }

}
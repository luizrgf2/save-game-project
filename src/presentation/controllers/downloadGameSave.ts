import { Right } from "../../data/errors/either";
import { GameSaveInterface } from "../../data/interfaces/gameSave";
import { CreateGameSaveUseCase } from "../../data/useCases/createGameSave";
import { DownloadGameSaveFromProviderUseCase } from "../../data/useCases/downloadGameSaveFromProvider";
import { ControllerImp } from "../interfaces/controller";
import { HTTPRequest, HTTPResponse } from "../interfaces/http";

export interface DownloadGameSaveControllerReq{
    nameGame:string,
    outputFolder:string,
    provider:"onedrive"|"drive"
}

export interface DownloadGameSaveControllerRes extends GameSaveInterface{}

export class DownloadGameSaveController implements ControllerImp{

    constructor(private readonly useCase:DownloadGameSaveFromProviderUseCase){}

    async exec(req: HTTPRequest<DownloadGameSaveControllerReq>) : Promise<HTTPResponse<void,Error>>{
        if(!req.body) return {status:422,error:new Error("Erro, os campos não podem estar vázios!")}
        const res = await this.useCase.exec({
            gameName:req.body.nameGame,
            outputFolder:req.body.outputFolder,
            provider:req.body.provider
        })
        if(res.left) return {status:res.left.code,error: res.left}
        return {status:200,body:undefined} as HTTPResponse
    }

}
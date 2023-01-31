import { Either, Left, Right } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"
import { providerImp } from "../interfaces/providerInterface"
import { gameSaveRepositoryImp } from "../interfaces/repository/gameSave"

export interface DownloadGameSaveFromProviderReq{
    gameName:string,
    outputFolder:string,
    provider:"drive"|"onedrive"
}

export interface DownloadGameSaveFromProviderRes{
    message:string
}

export class DownloadGameSaveFromProviderUseCase{
    
    constructor(private readonly gameSaveRepository:gameSaveRepositoryImp,private readonly provider:providerImp){}
    
    async exec({gameName,outputFolder,provider}:DownloadGameSaveFromProviderReq):Promise<Either<ErrorBase,DownloadGameSaveFromProviderRes>>{
        const gameSaveToDownload = await this.gameSaveRepository.getGameSaveWithGameName(gameName)
        if(gameSaveToDownload.left) return Left.create(gameSaveToDownload.left)
        const downloadGameSave = await this.provider.downloadGameSave(gameSaveToDownload.right.idProvider||"",outputFolder,provider)
        if(downloadGameSave.left) return Left.create(downloadGameSave.left)
        return Right.create({message:"Download completo e salvo!"})
    }
}
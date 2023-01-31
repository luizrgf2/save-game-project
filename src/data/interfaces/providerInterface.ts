import { Either } from "../errors/either";
import { ErrorBase } from "../errors/errorBase";

export interface providerImp{
    uploadSaveToProvider:(provider:"onedrive"|"drive",directoryOfGameSave:string,gameName:string)=>Promise<Either<ErrorBase,void>>
    deleteGameSave:(provider:"drive"|"onedrive",idProvider:string) =>Promise<Either<ErrorBase,void>>
    downloadGameSave: (idProvider:string,outputFolder:string,provider:"drive"|"onedrive")=>Promise<Either<ErrorBase,void>>
}

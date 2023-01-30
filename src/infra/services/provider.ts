import { Either, Left, Right } from "../../data/errors/either";
import { ErrorBase } from "../../data/errors/errorBase";
import { providerImp } from "../../data/interfaces/providerInterface";
import { Google } from "./google/google";

export class Provider implements providerImp{
    async uploadSaveToProvider (provider: "drive" | "onedrive", directoryOfGameSave: string, gameName: string) : Promise<Either<ErrorBase, void>>{
        if(provider === "drive"){
            const providerGoogle = await Google.exec()
            const fileUpdate = await providerGoogle.upload(directoryOfGameSave,gameName)
            if(fileUpdate) return Left.create(new ErrorBase(fileUpdate.message,400))
            return Right.create(undefined)
        }else{
            return Left.create(new ErrorBase("Provider ainda não é suportado!",400))
        }
    }

    async deleteGameSave (provider: "drive" | "onedrive", idProvider: string) : Promise<Either<ErrorBase, void>>{
        if(provider === "drive"){
            const providerGoogle = await Google.exec()
            const fileDelete = await providerGoogle.delete(idProvider)
            if(fileDelete) return Left.create(new ErrorBase(fileDelete.message,400))
            return Right.create(undefined)
        }else{
            return Left.create(new ErrorBase("Provider ainda não é suportado!",400))
        }
    }

}
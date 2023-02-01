import { OAuth2Client } from "google-auth-library";
import { Either, Left, Right } from "../../data/errors/either";
import { ErrorBase } from "../../data/errors/errorBase";
import { providerImp } from "../../data/interfaces/providerInterface";
import { Google } from "./google/google";
import fs from 'fs'
import path from 'path'

export class Provider implements providerImp{

    constructor(private readonly providerGoogle:Google){}

    private clientGoogle?:OAuth2Client

    private async getClientGoogle(){
        if(this.clientGoogle!== undefined) return this.clientGoogle
        return this.clientGoogle = await this.providerGoogle.getClient()
    }

    private async getProviderGoogle(){
        const client = await this.getClientGoogle()
        if(!client) return
        const provider = this.providerGoogle.exec(client)
        return provider
    }

    async uploadSaveToProvider (provider: "drive" | "onedrive", directoryOfGameSave: string, gameName: string) : Promise<Either<ErrorBase, void>>{
        if(provider === "drive"){
            const provider = await this.getProviderGoogle()
            if(!provider) return Left.create(new ErrorBase("Erro no cliente do google!",500))
            const fileUpdate = await provider.upload(directoryOfGameSave,gameName)
            if(fileUpdate) return Left.create(new ErrorBase(fileUpdate.message,400))
            return Right.create(undefined)
        }else{
            return Left.create(new ErrorBase("Provider ainda não é suportado!",400))
        }
    }

    async downloadGameSave (idProvider: string, outputFolder: string,provider:string,gameName:string) : Promise<Either<ErrorBase, void>>{
        if(provider === "drive"){
            const provider = await this.getProviderGoogle()
            if(!provider) return Left.create(new ErrorBase("Erro no cliente do google!",500))
            const fileDownload = await  provider.download(idProvider)
            if(fileDownload instanceof Error) return Left.create(new ErrorBase(fileDownload.message,400))
            
            const fileFinal = fs.createWriteStream(path.join(outputFolder,gameName+".zip"))
            fileDownload.pipe(fileFinal)
            return Right.create(undefined)
        }else{
            return Left.create(new ErrorBase("Provider ainda não é suportado!",400))
        }
    }


    async deleteGameSave (provider: "drive" | "onedrive", idProvider: string) : Promise<Either<ErrorBase, void>>{
        if(provider === "drive"){
            const provider = await this.getProviderGoogle()
            if(!provider) return Left.create(new ErrorBase("Erro no cliente do google!",500))
            const fileDelete = await  provider.delete(idProvider)
            if(fileDelete) return Left.create(new ErrorBase(fileDelete.message,400))
            return Right.create(undefined)
        }else{
            return Left.create(new ErrorBase("Provider ainda não é suportado!",400))
        }
    }

}
import { OAuth2Client } from "google-auth-library";
import { drive_v3, google } from "googleapis";
import { ProviderInterface } from "../interfaces/provider";
import fs from "fs"
import { gameSaveRepositoryImp } from "../../../data/interfaces/repository/gameSave";

export class ProviderGoogle implements ProviderInterface{

    private drive: drive_v3.Drive
    
    constructor(private readonly authGoogle:OAuth2Client, private readonly gameSaveRepository:gameSaveRepositoryImp){
        this.drive = google.drive({version:"v3",auth:authGoogle})
    }
    

    async upload(filePath: string, gameName: string) : Promise<Error | undefined>{
        try{
            const file = await this.drive.files.create({
                media:{
                    body:fs.createReadStream(filePath),
                    mimeType:"application/zip",
                
                },

                requestBody:{
                    name:gameName,
                },
                fields:'id,name'
            })

            const gameSaveUpdateId = await this.gameSaveRepository.updateIdProvider(file.data.id||"",gameName)

            if(gameSaveUpdateId.left) return new Error(gameSaveUpdateId.left.message)

            return undefined
        }catch(e){
            return new Error("Erro ao fazer upload no google drive!")
        }
    }

    async delete(id: string) : Promise<Error | undefined>{
        try{
            this.drive.files.delete({
                fileId:id
            })
        }catch(e){
            return new Error("Erro ao deletar arquivo no google drive!")
        }
    }

}
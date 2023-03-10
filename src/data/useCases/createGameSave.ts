import { GameSaveEntity, GameSaveProps } from "../../app/entities/gameSave"
import { Either, Left, Right } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"
import { Replacer } from "../helpers/replace"
import { CompressInterface } from "../interfaces/comporessfolder"
import { GameSaveInterface } from "../interfaces/gameSave"
import { providerImp } from "../interfaces/providerInterface"
import { gameSaveRepositoryImp } from "../interfaces/repository/gameSave"

export interface createGameSaveReq{
    gameSave:Replacer<GameSaveInterface,{id?:string,createdAt?:Date,updatedAt?:Date}>
}

export interface createGameSaveRes{
    gameSave:GameSaveProps
}

export class CreateGameSaveUseCase{

    constructor(
        private readonly gameSaveRepository:gameSaveRepositoryImp,
        private readonly provider:providerImp,
        private readonly gameSaveComporess:CompressInterface
    ){}

    async createGameSave({gameSave}:createGameSaveReq):Promise<Either<ErrorBase,GameSaveInterface>>{
        const createGameSave = await this.gameSaveRepository.create({
            directorySaveGame:gameSave.directorySaveGame,
            nameGame:gameSave.nameGame,
            provider:gameSave.provider,
            createdAt:gameSave.createdAt,
            id:gameSave.id,
            updatedAt:gameSave.updatedAt
        })
        if(createGameSave.left) return Left.create(createGameSave.left)
        return Right.create(createGameSave.right)
    }

    async uploadGameSave(gameName:string,directoryOfGameSave:string,provider:"drive"|"onedrive"):Promise<Either<ErrorBase,void>>{
        const gameSaveToSave = await this.provider.uploadSaveToProvider(provider,directoryOfGameSave,gameName)
        if(gameSaveToSave.left) return Left.create(gameSaveToSave.left)
        return Right.create(undefined)
    }

    async removeGameSaveFromDataBaseIfUploadFailed(gameNameToRemove:string):Promise<Either<ErrorBase,void>>{
        const gameSaveToRemove = await this.gameSaveRepository.deleteByGameName(gameNameToRemove)
        if(gameSaveToRemove.left) return Left.create(gameSaveToRemove.left)
        return Right.create(undefined)
    }

    async compressGameSave(directoryOfFolder:string):Promise<Either<ErrorBase, string>>{
        const gameToComprress = await this.gameSaveComporess.compress(directoryOfFolder)
        if(gameToComprress.left) return Left.create(gameToComprress.left)
        return Right.create(gameToComprress.right.directoryOfCompressFile)
    }

    async exec({gameSave}:createGameSaveReq):Promise<Either<ErrorBase,createGameSaveRes>>{
        const gameSaveToVerify =  GameSaveEntity.createWithValidations({
            directorySaveGame:gameSave.directorySaveGame,
            nameGame:gameSave.nameGame,
            provider:gameSave.provider
        })
        if(gameSaveToVerify instanceof Error) return Left.create(new ErrorBase(gameSaveToVerify.message,422))
        
        const gameSaveToCreate = await this.createGameSave({gameSave})
        if(gameSaveToCreate.left) return Left.create(gameSaveToCreate.left)
        
        const gameToCompress = await this.compressGameSave(gameSave.directorySaveGame)
        if(gameToCompress.left) return Left.create(gameToCompress.left)

        const gameSaveToUpload = await this.uploadGameSave(gameSave.nameGame,gameToCompress.right,gameSave.provider)
        if(gameSaveToUpload.left){
            const removeGameSave = await this.removeGameSaveFromDataBaseIfUploadFailed(gameSave.nameGame)
            if(removeGameSave.left) return Left.create(removeGameSave.left)
            return Left.create(gameSaveToUpload.left)
        }

        return Right.create({
            gameSave:gameSaveToCreate.right
        } as createGameSaveRes)
    }
}

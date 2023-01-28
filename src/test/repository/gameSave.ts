import { Either, Left, Right } from "../../data/errors/either";
import { ErrorBase } from "../../data/errors/errorBase";
import { GameSaveNotFoundError } from "../../data/errors/gameSaveNotFound";
import { Replacer } from "../../data/helpers/replace";
import { GameSaveInterface } from "../../data/interfaces/gameSave";
import { gameSaveRepositoryImp } from "../../data/interfaces/repository/gameSave";

export class GameSaveRepositoryFake implements gameSaveRepositoryImp{
    
    public gameSaves = [
        {
            createdAt: new Date("2021-05-01"),
            updatedAt:  new Date("2021-05-01"),
            directorySaveGame:"./src/resident-evil",
            id:"valid1",
            nameGame:"Resident Evil",
            provider:"drive"
        },
        {
            createdAt: new Date("2021-05-01"),
            updatedAt:  new Date("2021-05-01"),
            directorySaveGame:"./src/far-cry",
            id:"valid2",
            nameGame:"Far Cry",
            provider:"drive"
        },
        {
            createdAt: new Date("2021-05-01"),
            updatedAt:  new Date("2021-05-01"),
            directorySaveGame:"./src/Halo",
            id:"valid3",
            nameGame:"Halo",
            provider:"drive"
        },
        {
            createdAt: new Date("2021-05-01"),
            updatedAt:  new Date("2021-05-01"),
            directorySaveGame:"./src/Forza",
            id:"valid4",
            nameGame:"Forza",
            provider:"drive"
        },

    ] as GameSaveInterface[]
    
    async getAll () : Promise<Either<ErrorBase, GameSaveInterface[]>>{
        return Right.create(this.gameSaves)
    }

    async removeByGameName (gameName: string) :Promise<Either<ErrorBase, void>>{
        const gameSave = this.gameSaves.find(item=>item.nameGame === gameName)
        if(!gameSave) return Left.create(new GameSaveNotFoundError())
        return Right.create(undefined)
    }

    async create (gameSave: Replacer<GameSaveInterface, { id?: string , createdAt?: Date , updatedAt?: Date }>) : Promise<Either<ErrorBase,GameSaveInterface>>{
        
        const validGameSave = this.gameSaves.find(item=>item.id===gameSave.id)
        
        if(!validGameSave) return Left.create(new GameSaveNotFoundError())
        return Right.create(validGameSave)
    }
    
}
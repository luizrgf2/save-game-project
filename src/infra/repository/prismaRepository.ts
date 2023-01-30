import { PrismaClient } from "@prisma/client";
import { Either, Left, Right } from "../../data/errors/either";
import { ErrorBase } from "../../data/errors/errorBase";
import { Replacer } from "../../data/helpers/replace";
import { GameSaveInterface } from "../../data/interfaces/gameSave";
import { gameSaveRepositoryImp } from "../../data/interfaces/repository/gameSave";

export class PrismaRepository implements gameSaveRepositoryImp{

    constructor(private readonly prismaClient:PrismaClient){}

    async create(gameSave: Replacer<GameSaveInterface, { id?: string, createdAt?: Date, updatedAt?: Date }>) : Promise<Either<ErrorBase,GameSaveInterface>>{
        try{
            const gameSaveToCreate = await this.prismaClient.gameSave.create({
                data:{
                    directorySaveGame:gameSave.directorySaveGame,
                    gameName:gameSave.nameGame,
                    provider:gameSave.provider,
                    createdAt:gameSave.createdAt,
                    id:gameSave.id,
                    updatedAt:gameSave.updatedAt
                }
            })
            return Right.create({
                createdAt:gameSaveToCreate.createdAt,
                directorySaveGame:gameSaveToCreate.directorySaveGame,
                id:gameSaveToCreate.id,
                updatedAt:gameSaveToCreate.updatedAt,
                nameGame:gameSaveToCreate.gameName,
                provider:gameSaveToCreate.provider as any
            })
        }catch{
            return Left.create(new ErrorBase("Erro no servidor",500))
        }
    }

    async removeByGameName(gameName: string) : Promise<Either<ErrorBase, void>>{
        try{
            const gameSaveToRemove = await  this.prismaClient.gameSave.delete({
                where:{
                    gameName:gameName
                }
            })

            return Right.create(undefined)
        }catch{
            return Left.create(new ErrorBase("Erro no servidor",500))
        }
    }

    async deleteByGameName(gameName: string) : Promise<Either<ErrorBase, void>>{
        try{
            const gameSaveToRemove = await  this.prismaClient.gameSave.delete({
                where:{
                    gameName:gameName
                }
            })

            return Right.create(undefined)
        }catch{
            return Left.create(new ErrorBase("Erro no servidor",500))
        }
    }

    async getAll() : Promise<Either<ErrorBase, GameSaveInterface[]>>{
        try{
            const gameSaves = await  this.prismaClient.gameSave.findMany({
            })

            const gamesSavesToReturn = gameSaves.map(item=>({
                createdAt:item.createdAt,
                directorySaveGame:item.directorySaveGame,
                id:item.id,
                nameGame:item.gameName,
                provider:item.provider,
                updatedAt:item.updatedAt
            } as GameSaveInterface))

            return Right.create(gamesSavesToReturn)
        }catch{
            return Left.create(new ErrorBase("Erro no servidor",500))
        }
    }


}
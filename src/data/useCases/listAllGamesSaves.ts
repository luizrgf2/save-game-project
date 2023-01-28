import { Either, Left, Right } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"
import { GameSaveInterface } from "../interfaces/gameSave"
import { gameSaveRepositoryImp } from "../interfaces/repository/gameSave"

export interface ListAllGameSavesRes{
    gamesSaves:GameSaveInterface[]
}

export class ListAllGamesSavesUseCase{

    constructor(
        private readonly gameSaveRepository:gameSaveRepositoryImp
    ){
    }

    async exec():Promise<Either<ErrorBase,ListAllGameSavesRes>>{
        
        const gameSavesToFind = await this.gameSaveRepository.getAll()
        if(gameSavesToFind.left) return Left.create(gameSavesToFind.left)
        return Right.create({
            gamesSaves:gameSavesToFind.right
        } as ListAllGameSavesRes)
    }

}
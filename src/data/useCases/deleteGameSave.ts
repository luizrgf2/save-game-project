import { Either, Left, Right } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"
import { providerImp } from "../interfaces/providerInterface"
import { gameSaveRepositoryImp } from "../interfaces/repository/gameSave"

export interface DeleteGameSaveReq{
    nameGame:string,
    idProvider:string,
    provider:"drive"|"onedrive"
}

export class DeleteGameSaveUseCase{

    constructor(
        private readonly gameSaveRepository:gameSaveRepositoryImp,
        private readonly providerController:providerImp
    ){
    }

    async exec({nameGame,provider,idProvider}:DeleteGameSaveReq):Promise<Either<ErrorBase,void>>{
        
        const gameSaveDeleteFromProvider = await this.providerController.deleteGameSave(provider,idProvider)
        if(gameSaveDeleteFromProvider.left) return Left.create(gameSaveDeleteFromProvider.left)
        
        const gameSaveToDelete = await this.gameSaveRepository.deleteByGameName(nameGame)
        if(gameSaveToDelete.left) return Left.create(gameSaveToDelete.left)

        return Right.create(undefined)
    }

}

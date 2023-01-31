import { DeleteGameSaveUseCase } from "../../data/useCases/deleteGameSave"
import { prismaClient } from "../../infra/database/prismaClient"
import { PrismaRepository } from "../../infra/repository/prismaRepository"
import { Google } from "../../infra/services/google/google"
import { Provider } from "../../infra/services/provider"
import { DeleteGameSaveController } from "../../presentation/controllers/deleteGameSave"


export class DeleteGameSaveFactory{

    static handle(){
        const google = new Google()
        const provider = new Provider(google)
        const repo = new PrismaRepository(prismaClient)
        const useCase = new DeleteGameSaveUseCase(repo,provider)
        const controller = new DeleteGameSaveController(useCase)
        return controller
    }

}
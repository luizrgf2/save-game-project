import { CreateGameSaveUseCase } from "../../data/useCases/createGameSave"
import { prismaClient } from "../../infra/database/prismaClient"
import { PrismaRepository } from "../../infra/repository/prismaRepository"
import { Google } from "../../infra/services/google/google"
import { Provider } from "../../infra/services/provider"
import { CreateGameSaveController } from "../../presentation/controllers/createGameSave"

export class CreateGameSaveFactory{

    static handle(){
        const google = new Google()
        const provider = new Provider(google)
        const repo = new PrismaRepository(prismaClient)
        const useCase = new CreateGameSaveUseCase(repo,provider)
        const controller = new CreateGameSaveController(useCase)
        return controller
    }

}
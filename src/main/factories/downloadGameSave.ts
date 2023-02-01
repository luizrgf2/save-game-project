import { DownloadGameSaveFromProviderUseCase } from "../../data/useCases/downloadGameSaveFromProvider"
import { prismaClient } from "../../infra/database/prismaClient"
import { PrismaRepository } from "../../infra/repository/prismaRepository"
import { Google } from "../../infra/services/google/google"
import { Provider } from "../../infra/services/provider"
import { DownloadGameSaveController } from "../../presentation/controllers/downloadGameSave"


export class DownloadGameSaveFactory{

    static handle(){
        const google = new Google()
        const provider = new Provider(google)
        const repo = new PrismaRepository(prismaClient)
        const useCase = new DownloadGameSaveFromProviderUseCase(repo,provider)
        const controller = new DownloadGameSaveController(useCase)
        return controller
    }

}
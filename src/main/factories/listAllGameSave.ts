import { ListAllGamesSavesUseCase } from "../../data/useCases/listAllGamesSaves"
import { prismaClient } from "../../infra/database/prismaClient"
import { PrismaRepository } from "../../infra/repository/prismaRepository"
import { ListAllGameSaveController } from "../../presentation/controllers/listAllGameSave"


export class ListAllGameSaveFactory{

    static handle(){
        const repo = new PrismaRepository(prismaClient)
        const useCase = new ListAllGamesSavesUseCase(repo)
        const controller = new ListAllGameSaveController(useCase)
        return controller
    }

}
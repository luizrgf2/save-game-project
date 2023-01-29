import { Either, Right } from "../data/errors/either";
import { ErrorBase } from "../data/errors/errorBase";
import { providerImp } from "../data/interfaces/providerInterface";

export class ProviderFake implements providerImp{
   async deleteGameSave (provider: "drive" | "onedrive", gameName: string) : Promise<Either<ErrorBase, void>>{
      return Right.create(undefined)
   }

   async uploadSaveToProvider (provider: "drive" | "onedrive", directoryOfGameSave: string, gameName: string) : Promise<Either<ErrorBase, void>>{
        return Right.create(undefined)
   }

}
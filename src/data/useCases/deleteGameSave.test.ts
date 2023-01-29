import { ProviderFake } from "../../test/providerFake"
import { GameSaveRepositoryFake } from "../../test/repository/gameSave"
import { Either, Left, Right } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"
import { providerImp } from "../interfaces/providerInterface"
import { gameSaveRepositoryImp } from "../interfaces/repository/gameSave"
import { DeleteGameSaveUseCase } from "./deleteGameSave"

describe("deleteGameSaveUseCase", function(){

    const gameSaveRepository = new GameSaveRepositoryFake()
    const provider = new ProviderFake()


    it("should be able delete valid gameSave", async function(){
        const sut =  new DeleteGameSaveUseCase(gameSaveRepository,provider)
        const res = await sut.exec({nameGame:"Resident Evil",provider:"drive"})
        expect(res.left).toBeFalsy()

    })
})
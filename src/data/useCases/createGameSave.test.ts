import { ProviderFake } from "../../test/providerFake"
import { GameSaveRepositoryFake } from "../../test/repository/gameSave"
import { CreateGameSaveUseCase } from "./createGameSave"

describe("createGameSaveUseCase", function(){

    const gameSaveRepository = new GameSaveRepositoryFake()
    const provider = new ProviderFake()

    it("should be able create gameSave with valid informations", async function(){
        const sut = new CreateGameSaveUseCase(gameSaveRepository,provider)
        const gameSave = gameSaveRepository.gameSaves[0]

        const res = await sut.exec({
            gameSave:gameSave
        })

        expect(res.left).toBeFalsy()
        expect(res.right?.gameSave).toEqual(gameSave)
    })
})
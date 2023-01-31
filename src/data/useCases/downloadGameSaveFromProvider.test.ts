import { ProviderFake } from "../../test/providerFake"
import { GameSaveRepositoryFake } from "../../test/repository/gameSave"
import { DownloadGameSaveFromProviderUseCase } from "./downloadGameSaveFromProvider"

describe("downloadGameSaveFromProvider", function(){

    const gameSaveRepository = new GameSaveRepositoryFake()
    const provider = new ProviderFake()

    it("should be able download saves from provider selected", async function(){
        const sut = new DownloadGameSaveFromProviderUseCase(gameSaveRepository,provider)
        const res = await sut.exec({
            gameName:"Resident Evil",
            outputFolder:"./saves",
            provider:"drive"
        })
        expect(res.left).toBeFalsy()
        expect(res.right?.message).not.toBe(undefined)
    })

})
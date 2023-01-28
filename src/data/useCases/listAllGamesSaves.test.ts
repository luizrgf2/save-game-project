import { GameSaveRepositoryFake } from "../../test/repository/gameSave"
import { ListAllGamesSavesUseCase } from "./listAllGamesSaves"

describe("listGamesSavesUseCase", function(){


    const gameSaveRepository = new GameSaveRepositoryFake()

    it("should be able list all gamesSaves", async function(){

        const sut = new ListAllGamesSavesUseCase(gameSaveRepository)
        const res = await sut.exec()
        expect(res.left).toBeFalsy()
        expect(res.right?.gamesSaves).toEqual(gameSaveRepository.gameSaves)
    })

})
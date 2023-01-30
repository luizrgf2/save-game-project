import { prismaClient } from "../database/prismaClient"
import { PrismaRepository } from "./prismaRepository"

describe("prismaRepository", function(){
    
    const gameSaveToTest = {
        directorySaveGame:"./src",
        nameGame:"Resident Evil",
        provider:"drive",
        id:"1"
    }

    const sut = new PrismaRepository(prismaClient)
    
    it("should be able create gameSave", async function(){
        const res = await sut.create(gameSaveToTest as any)
        expect(res.left).toBeFalsy()
        expect(res.right?.id).toEqual(gameSaveToTest.id)
    })

    it("should be able get all gameSaves", async function(){
        const res = await sut.getAll()
        expect(res.left).toBeFalsy()
        expect(res.right).toHaveLength(1)
    })

    it("should be able delete gameSave with name", async function(){
        const res = await sut.deleteByGameName("Resident Evil")
        expect(res.left).toBeFalsy()
    })
})
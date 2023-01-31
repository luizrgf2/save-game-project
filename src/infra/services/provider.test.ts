import { Provider } from "./provider"
import path from 'path'
import { PrismaRepository } from "../repository/prismaRepository"
import { prismaClient } from "../database/prismaClient"
import { Google } from "./google/google"


describe("providers", function(){
    const providerGoogle = new Google()
    const sut = new Provider(providerGoogle)


    beforeAll(async ()=>{

        const gameSaveRepository = new PrismaRepository(prismaClient)
        await gameSaveRepository.create({
            directorySaveGame:path.join(process.cwd(),"src","test","filesToUpload","test.zip"),
            nameGame:"resident evil",
            provider:"drive"
        })

    })

    afterAll(async ()=>{

        const gameSaveRepository = new PrismaRepository(prismaClient)
        await gameSaveRepository.deleteByGameName("resident evil")
    })

    
    it("should be able create file in google drive", async function(){
        const res = await sut.uploadSaveToProvider("drive",path.join(process.cwd(),"src","test","filesToUpload","test.zip"),"resident evil")
        expect(res.left).toBeFalsy()
    })

    it("delete be able gameSave from google driver", async function(){
        const gameSaveRepository = new PrismaRepository(prismaClient)

        const gameSave = (await gameSaveRepository.getAll()).right
        expect(gameSave).not.toBe(undefined)
        if(gameSave === undefined) return
        const res = await sut.deleteGameSave("drive",gameSave[0].idProvider||"")
        expect(res.left).toBeFalsy()
    })
})
import { GameSaveEntity } from "./gameSave"

describe("GameSave Entity with valid nameGame", function(){
    it("should be able create gameSave", function(){
        const sut = new GameSaveEntity({
            directorySaveGame:"./src",
            nameGame:"Resident evil",
            provider:"drive"
        })

        expect(sut.isValidNameGame()).toBeTruthy()

    })

    it("should be able return false if create GameSaveEntity with gameName with then less of 4 caracter", function(){
        const sut = new GameSaveEntity({
            directorySaveGame:"./src",
            nameGame:"Re",
            provider:"onedrive"
        })

        expect(sut.isValidNameGame()).toBeFalsy()

    })

    it("should be able return false if create GameSaveEntity with gameName with then upper of 200 caracter", function(){
        const sut = new GameSaveEntity({
            createdAt:new Date(),
            directorySaveGame:"./src",
            provider:"drive",
            nameGame:"Re".repeat(201),
            updatedAt:new Date()
        })

        expect(sut.isValidNameGame()).toBeFalsy()

    })

    it("should be able create gameSave if provider receive support", function(){
        const sut = new GameSaveEntity({
            createdAt:new Date(),
            directorySaveGame:"./src",
            provider:"drive",
            nameGame:"Re".repeat(201),
            updatedAt:new Date()
        })

        expect(sut.isValidProvider()).toBeTruthy()
    })

    it("should be able return false if provider not supported", function(){
        const sut = new GameSaveEntity({
            createdAt:new Date(),
            directorySaveGame:"./src",
            provider:"mediafire" as any,
            nameGame:"Re".repeat(201),
            updatedAt:new Date()
        })

        expect(sut.isValidProvider()).toBeFalsy()
    })
})
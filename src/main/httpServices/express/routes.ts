import { Router } from "express";
import { CreateGameSaveFactory } from "../../factories/createGameSave";
import { DeleteGameSaveFactory } from "../../factories/deleteGameSave";
import { ListAllGameSaveFactory } from "../../factories/listAllGameSave";

export const routerExpress = Router()


routerExpress.post("/gamesave/create", async (req,res)=>{
    const body = req.body
    const response = await CreateGameSaveFactory.handle().exec({body:{
        directory:req.body.directory,
        nameGame:req.body.nameGame,
        provider:req.body.provider
    }})
    if(response.error) return res.status(response.status).send(response.error.message)
    return res.status(response.status).send(response.body)
})

routerExpress.delete("/gamesave/delete/:gameName/:idProvider/:provider", async (req,res)=>{
    const params = req.params
    const gameName = params.gameName
    const idProvider = params.idProvider
    const provider = params.provider
    const response = await DeleteGameSaveFactory.handle().exec({body:{
        gameName:gameName,
        idProvider:idProvider,
        provider:provider as any
    }})
    if(response.error) return res.status(response.status).send(response.error.message)
    return res.status(response.status).send(response.body)
})

routerExpress.get("/gamesave/list", async (req,res)=>{
    const response = await ListAllGameSaveFactory.handle().exec({})
    if(response.error) return res.status(response.status).send(response.error.message)
    return res.status(response.status).send(response.body)
})
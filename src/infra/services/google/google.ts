import { OAuth2Client } from "google-auth-library";
import { prismaClient } from "../../database/prismaClient";
import { PrismaRepository } from "../../repository/prismaRepository";
import { AuthGoogle } from "./authentication";
import { ProviderGoogle } from "./provider";

export class Google{
    

    constructor(){

    }

    async getClient(){
        const auth = new AuthGoogle()
        const client = await auth.exec()
        return client
    }

    exec(client:OAuth2Client){

        const repo = new PrismaRepository(prismaClient)
        const provider = new ProviderGoogle(client,repo)
        return provider
    }

}
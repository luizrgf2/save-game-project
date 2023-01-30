import { prismaClient } from "../../database/prismaClient";
import { PrismaRepository } from "../../repository/prismaRepository";
import { AuthGoogle } from "./authentication";
import { ProviderGoogle } from "./provider";

export class Google{

    static async exec(){
        const auth = new AuthGoogle()
        const client = await auth.exec()
        const repo = new PrismaRepository(prismaClient)
        const provider = new ProviderGoogle(client,repo)
        return provider
    }

}
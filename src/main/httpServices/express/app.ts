import express,{ Application } from "express";
import { routerExpress } from "./routes";

class ExpressApp{

    public app:Application

    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }

    public middleware(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
    }

    public routes(){
        this.app.use(routerExpress)
    }

}

export default new ExpressApp()
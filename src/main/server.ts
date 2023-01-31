import ExpressApp from "./httpServices/express/app";

ExpressApp.app.listen(8080,()=>{
    console.log("Server connected!")
})
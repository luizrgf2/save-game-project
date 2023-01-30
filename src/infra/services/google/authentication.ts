import fs from "fs"
import {authenticate}  from'@google-cloud/local-auth'
import {google}  from'googleapis'
import { OAuth2Client } from "google-auth-library"
import path from 'path'


const pathFileCredentials = path.join(process.cwd(),"secret-google.json")

export class AuthGoogle{

    private scopes = ["https://www.googleapis.com/auth/drive.file"]
    private credentialJson:any
    private tokenJson?:any

    constructor(){
        this.credentialJson = this.openCredentialFileJson()
        this.tokenJson = this.openTokenFileJson()
    }

    private openCredentialFileJson(){
        if(!fs.existsSync("secret-google.json")) throw new Error("O arquivo secret-google.json não esta na pasta!")
        const file = JSON.parse(fs.readFileSync("secret-google.json",{encoding:"utf-8"}))
        return file
    }

    private openTokenFileJson(){
        if(!fs.existsSync("token-google.json")) return
        const file =  JSON.parse(fs.readFileSync("token-google.json",{encoding:"utf-8"}))
        return file
    }

    private async loadSavedCredentialsIfExist() {
        try {
            if(this.tokenJson === undefined) return
            return google.auth.fromJSON(this.tokenJson);
        } catch (err) {
            return;
        }
    }

    private saveCredenetial(client:any){
        const key = this.credentialJson.installed || this.credentialJson.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        fs.writeFileSync("token-google.json", payload);
    }

    async exec() {
        
        if(this.tokenJson !== undefined){
            let client = await this.loadSavedCredentialsIfExist();
            if (client) {
              return client as OAuth2Client
            }
        }
        

        const clientFinal = await authenticate({
          scopes: this.scopes,
          keyfilePath: pathFileCredentials,
        });
        
        if (clientFinal.credentials) {
          this.saveCredenetial(clientFinal);
        }
        return clientFinal;
    }




}
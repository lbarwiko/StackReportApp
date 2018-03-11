export class User {
    user_id: number;
    username: string;
    constructor(params) {
        //Required Params
        if(!params || params.user_id == null || params.username == null){
           throw "Missing required field"; 
        }
        this.user_id = params.user_id;
        this.username = params.username;
    }
    getUserName(){
        return this.username;
    }
    getUserId(){
        return this.user_id;
    }/*
    refresh(){
        return;
    }*/
 };
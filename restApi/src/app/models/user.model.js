class User{
    constructor(params){
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
    }
    refresh(){
        return;
    }
}
class RootUser extends User{
    constructor(params){
        super(params);
        //Required Parameters
        if(params.token == null || params.role == null || params.tier == null){
            throw "Missing Required Fields";
        }
        this.token = params.token;
        this.role = params.role;
        this.tier = params.tier;
    }
    getToken(){
        return this.token;
    }
    isAuthenticated(){
        return !!this.token;
    }
    getRole(){
        return this.role;
    }
    refresh(){
        return;
    }
    fetch(url, options={}){
        console.log("test");
        if(!options.headers){
            options.headers = {};
        }
        options.headers['Authorization'] = this.getToken();
        console.log(options);
        return fetch(url, options)
    }
}
export {RootUser, User};
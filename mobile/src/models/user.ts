export class User {
    user_id: number;
    username: string;
    token: string;
    tier: string;
    role: string;
    email: string;
    anon: boolean;
    constructor(params) {
        if(!params|| !params.username){
            console.log('Returning empty user');
            return this;
        }

        //Required Params
        if(!params || params.user_id == null || params.username == null || params.token == null){
           throw "Missing required field"; 
        }
        this.user_id = params.user_id;
        this.username = params.username;
        this.token = params.token;
        this.tier = params.tier;
        this.role = params.role;
        this.email = params.email;
        this.anon = params.anon;
        return this;
    }
    getToken():string{
    	return this.token;
    }
    getUsername():string{
        return this.username;
    }
    getUserId():number{
        return this.user_id;
    }
    getTier():string{
    	return this.tier;
    }
    getRole():string{
        return this.role;
    }
    getEmail():string{
        return this.email;
    }
 };

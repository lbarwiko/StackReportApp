// User model

class User{
    constructor(props){
        if(!props || !props.username || !props.password || !props.role){
            throw 'Missing props';
        }
        this.username = props.username;
        this.password = props.password;
        this.role = props.role
    }
}

export default User;
/* Password Constraint
    Input: password
    Output : Promise -> Resolve if password is valid
                        Reject if password is not valid
    - Checks to make sure password is valid
    - Right now we only make sure there is a minimum length
*/

export default (password)=>{
    return new Promise((resolve, reject)=>{
        if(password.length >= 6){
            return resolve(password);
        }
        return reject({
            err: 'Password does not meet minimum length',
            code: 400
        });
    });
}
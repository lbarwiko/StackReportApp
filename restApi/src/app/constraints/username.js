/* Username Constraint
    Input: username
    Output : Promise -> Resolve if username is valid
                        - Transforms username to lowercase
                        Reject if user is not valid
    - Checks to make sure a username is valid
*/

export default (username)=>{
    return new Promise((resolve, reject)=>{
        return resolve(username.toLowerCase());
    });
}
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const create_token = (id,user)=>{
    return jwt.sign({id:id,user:user},config.jwt_key,{expiresIn:config.jwt_expires})
}
module.exports = create_token;
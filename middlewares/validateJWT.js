const { response } = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require('jsonwebtoken');


const checkJWT = ( req, res = response, next ) => {

    //x-token - headers
    const token = req.header('x-token');
    console.log(token);
    if( !token ) {
        return res.status(400).json({
            ok: false,
            msg: 'There is no token in the request.'
        })
    }

    try {
    
        const { name, uid } = jwt.verify(
            token,
            process.env.SECRET_JWT
        );
        //data taken from request
        req.uid = uid;
        req.name = name;
        
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        })
    }

    next();

}


module.exports = {
    checkJWT
}
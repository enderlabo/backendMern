/*
    Endpoint Aut - HOST + /api/auth/
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { createUserM,
        loginUserM,
        renewToken 
    } = require("../controller/authMolitaliaController");
const { fieldsValidate } = require("../middlewares/fieldsValidator");
const { checkJWT } = require("../middlewares/validateJWT");

router.post( "/login", [ 
    check("rName", "El nombre es requerido").not().isEmpty(), 
    check("rCode", " La contraseña debe de tener al menos 6 carácteres").isLength({
        min: 6,
        max: 20
    }),
    fieldsValidate  
    ],
    loginUserM
 );

 router.post( "/nuevo", [ 
    check("rName", "El nombre es requerido").not().isEmpty(), 
    check("rCode", " La contraseña debe de tener al menos 6 carácteres").isLength({
        min: 6,
        max: 20
    }),
    fieldsValidate  
    ],
    createUserM
 );

 router.get("/renew", [checkJWT], renewToken);

 module.exports = router;
       

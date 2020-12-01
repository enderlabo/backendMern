const { response } = require("express");
const bcrypt = require("bcryptjs");
const UserMolitalia = require("../models/userMolitaliaModel");
const { generateJWT } = require("../helpers/JWT");


const createUserM = async( req, res = response ) => {
    const { rName, rCode } = req.body;

    try {
        let userM = await UserMolitalia.findOne({ rCode });
        
        if( userM ) {
            return res.status(400).json({
                ok: false,
                msg: "El código ya fue usado."
            });
        }

        user = new UserMolitalia( req.body );

        //Code Encrpt
        const salt = bcrypt.genSaltSync();
        userM.rCode = bcrypt.hashSync( rCode, salt );

        await userM.save();
        //Generate JWT
        const token = await generateJWT( userM.id, userM.rName );

        res.status(201).json({
            ok: true,
            uid: userM.id,
            name: userM.rName,
            token
            
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error 500, contactar al Administrador."
        });
    }
}

const loginUserM = async ( req, res = response ) => {

    const { rName, rCode } = req.body;

    try {
        let userM = await UserMolitalia.findOne({ rCode });
        
        if( !userM ) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario y/o contraseña no es válidos."
            });
        }

        //Match password with bycrept
    const validPassword = bcrypt.compareSync( password, user.rCode );

    //Generate JWT
    
    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: "El código no es válido.",
        });
    }
    const token = await generateJWT(user.id, user.rName);

    res.status(200).json({
        ok: true,
        uid: user.id,
        name: user.name,
        token,
      });
    }catch( error ){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error 500, contactar al Administrador.",
    });
    }
}

const renewToken = async (req, res = response) => {
    //Generate New Token
    const token = await generateJWT(req.uid, req.rName);
    const { uid, name } = req;
    res.status(200).json({
      ok: true,
      uid,
      name,
      token,
    });
  };

module.exports = {
    createUserM,
    loginUserM,
    renewToken


}
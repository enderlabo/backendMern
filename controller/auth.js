const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateJWT } = require("../helpers/JWT");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  //If email exists return status400
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Email already is used",
      });
    }

    user = new User(req.body);

    //Password Encrpt
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    //Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Bad request, contact to Admin",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //If email exists return status400
    var user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "The user does not match with that email.",
      });
    }
    //Match password with bycrept
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "The password is not valid.",
      });
    }

    //Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Bad request, contact to Admin",
    });
  }

  // res.status(200).json({
  //     ok: true,
  //     msg: 'Login',
  //     email,
  //     token
  // })
};

const renewToken = async (req, res = response) => {
  //Generate New Token
  const token = await jwt.generateJWT(req.uid, req.name);

  res.status(200).json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};

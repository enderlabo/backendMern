/*
    Endpoint Aut - HOST + /api/auth/
*/
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
  createUser,
  loginUser,
  renewToken,
} = require("../controller/authController");
const { fieldsValidate } = require("../middlewares/fieldsValidator");
const { checkJWT } = require("../middlewares/validateJWT");

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password should be at least 6 chars long").isLength({
      min: 6,
    }),
    fieldsValidate,
  ],
  loginUser
);

router.post(
  "/new",
  [
    //MiddleWares
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be at least 6 chars long").isLength({
      min: 6,
    }),
    fieldsValidate,
  ],
  createUser
);

router.get("/renew", [checkJWT], renewToken);

module.exports = router;

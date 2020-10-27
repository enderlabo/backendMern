/*
    Endpoint Aut - HOST + /api/auth/
*/
const { Router } = require("express");
const router = Router();
const { checkJWT } = require("../middlewares/validateJWT");
const { check } = require("express-validator");
const { fieldsValidate } = require("../middlewares/fieldsValidator");
const {
  getEvents,
  createEvents,
  updateEvents,
  deleteEvents,
} = require("../controller/events");
const isDate = require("../helpers/isDate");

router.use(checkJWT);

//Get Event
router.get("/", getEvents);

//Post Event
router.post(
  "/",
  [
    check("title", "the title is required").not().isEmpty(),
    check("start", "Date is required").isDate(),
    check("end", "Ending date is required").isDate(),
    fieldsValidate,
  ],
  createEvents
);

//Update Event
router.put("/:id", updateEvents);
//Delete Event
router.delete("/:id", deleteEvents);

module.exports = router;

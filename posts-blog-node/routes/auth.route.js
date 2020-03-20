const router = require("express").Router();
const bodyParser = require("body-parser");

const authCtrl = require("../controllers/auth.controller");
const authGuard = require("../guards/auth.guard");

router.get("/", authGuard.isAuth, authCtrl.verify);

router.post("/signup", bodyParser.json(), authGuard.notAuth, authCtrl.signup);

router.post("/login", bodyParser.json(), authGuard.notAuth, authCtrl.login);

module.exports = router;

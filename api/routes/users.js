const { Router } = require("express");

const { authorize } = require("../middlewares");
const controller = require("../controllers/users");

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/temporary", authorize, controller.temporary);
router.get("/search", authorize, controller.search);

module.exports = router;

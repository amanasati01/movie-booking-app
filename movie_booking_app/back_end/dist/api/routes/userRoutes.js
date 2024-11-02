"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userContoller_1 = require("../controllers/userContoller");
const router = (0, express_1.Router)();
router.route('/register').post(userContoller_1.registerUser);
router.route('/login').post(userContoller_1.loginUser);
router.route('/logout').get(userContoller_1.logoutUser);
exports.default = router;

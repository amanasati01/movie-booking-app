import { Router } from "express";
import  {loginUser, logoutUser, registerUser}  from "../controllers/userContoller"; 
const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
export default router;

import { Router } from "express";
import * as userController from '../controllers/userController.js'
import { body } from "express-validator";
const router=Router();


router.post('/register',
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters'),
    userController.createUserController)

router.post('/login',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be 6 characters long'),
    userController.loginController)

export default router;
import { check } from "express-validator";


export const registerValidator = [
    check('name').not().isEmpty().withMessage('Name is required'),

    check('email').isEmail().withMessage('Email is not valid'),
    
    check('password').isLength({min: 8, max: 16}).withMessage('Password must be between 8 and 16 characters or numbers'),
]


export const loginValidator = [

    check('email').isEmail().withMessage('Email is not valid'),
    
    check('password').isLength({min: 8, max: 16}).withMessage('Password must be between 8 and 16 characters or numbers'),
]
import { check } from "express-validator";

<<<<<<< HEAD
export const tagCreateValidation = [
    check('name').not().isEmpty().withMessage('Name is required')
]
=======
export const tagCreateValidator = [
    check('name').not().isEmpty().withMessage('Name is required'),
]
>>>>>>> 9421d473b8611e24f4461ab0f77985704a900484

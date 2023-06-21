import { check } from "express-validator";

export const tagCreateValidation = [
    check('name').not().isEmpty().withMessage('Name is required')
]
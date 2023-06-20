import Category from "../models/category.js";
import slugify from 'slugify'
import { errorHandler } from '../helpers/dbErrHandler.js'

export const store = (req, res) => {

    const { name } = req.body;
    const slug = slugify(name).toLowerCase();

    Category.findOne({ 'slug': slug }).then(result => {
        if (result) {
            return res.status(400).json({
                message: "You already created a category with this name and slug"
            })
        }
        const category = new Category({ name, slug });
        category.save().then((data) => {
            
            if (!data) {
                return res.status(400).json({
                    error: 'error from server when as save new category'
                })
            }
            return res.json(data)
        })

    }).catch((error) => {
        return res.status(400).json({
            error: errorHandler(error)
        })
    });

}
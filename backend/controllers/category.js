import Category from "../models/category.js";
import slugify from 'slugify'
import { errorHandler } from '../helpers/dbErrHandler.js'

export const index = (req, res) => {
    return Category.find({}).then(cate => {
        return res.json(cate);
    });
}

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

export const show = (req, res) => {

    const slug = req.params.slug.toLowerCase();

    return Category.findOne({ slug }).then(cate => {

        if (!cate) {
            return res.status(400).json({
                message: 'we not found any category with this slug...'
            })
        }
        return res.json(cate);
    });
}

export const update = (req, res) => {

    const slugParam = req.params.slug.toLowerCase();
    const { name } = req.body;
    const slug = slugify(name).toLowerCase();

    if (slugParam !== slug) {
        Category.findOneAndUpdate({ slug: slugParam }, { name, slug }, { new: true });
        return res.json("successfully acction")
    }
    return res.status(400).json({
        message: `There seems to be a problem.If you *Really want to edit the category*, Find the category by *SLUG* and enter a *NEW NAME* for your category.Try again...`
    })

}

export const destroy = (req, res) => {

    try {
        const slug = req.params.slug.toLowerCase();
        return Category.findOneAndRemove({ slug }).then(doc => {
            if (doc) {
                return res.json({
                    message: doc.name + ' --removed successfuly'
                })
            }
            return res.status(400).json({
                error: "not found category with this slug..."
            })
        });

    } catch (error) {
        return res.status(400).json({
            error: errorHandler(error)
        })
    }
}

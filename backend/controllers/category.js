import Category from "../models/category.js";
import slugify from 'slugify'
import { errorHandler } from '../helpers/dbErrHandler.js'

export const index = (req, res) => {
    return Category.find({}).then(item => {
        return res.json(item);
    });
}

export const store = (req, res) => {

    const { name } = req.body;
    const slug = slugify(name).toLowerCase();

    Category.findOne({ 'slug': slug }).then(result => {
        if (result) {
            return res.status(400).json({
                error: "You already created a category with this name and slug"
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
                error: 'we not found any category with this slug...'
            })
        }
        return res.json(cate);
    });
}

export const update = (req, res) => {

    const id = req.params.id;
    
    const { name } = req.body;
    const slug = slugify(name).toLowerCase();

    Category.find({ slug }).then(result => {
        if (result.length > 0) {
            return res.status(400).json({
                error: `You can not use this name: ${name}.It may have been used before...`
            })
        } else {
            Category.findByIdAndUpdate({ _id: id }, { name: name, slug: slug }, { upsert: true }).catch(err => console.log(err));
            return res.json("successfully acction")
        }
    })
}

export const destroy = (req, res) => {

    try {
        const slug = req.params.slug.toLowerCase();
        return Category.findOneAndRemove({ slug }).then(doc => {
            if (doc) {
                return res.json({
                    error: doc.name + ' --removed successfuly'
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

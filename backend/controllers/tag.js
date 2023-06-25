
import Tag from "../models/tag.js";
import slugify from 'slugify'
import { errorHandler } from '../helpers/dbErrHandler.js'

export const index = (req, res) => {
    return Tag.find({}).then(item => {
        return res.json(item);
    });
}

export const store = (req, res) => {

    const { name } = req.body;
    const slug = slugify(name).toLowerCase();

    Tag.findOne({ 'slug': slug }).then(result => {
        if (result) {
            return res.status(400).json({

                error: "You already created a tag with this name and slug"
            })
        }
        const tag = new Tag({ name, slug });
        tag.save().then((data) => {

            if (!data) {
                return res.status(400).json({
                    error: 'error from server when as save new tag'
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


    return Tag.findOne({ slug }).then( item => {

        if (!item) {
            return res.status(400).json({
                error: 'we not found any tag with this slug...'
            })
        }
        return res.json(item);
    });
}

export const update = (req, res) => {


    const id = req.params.id;

    const { name } = req.body;
    const slug = slugify(name).toLowerCase();

    Tag.find({ slug }).then(result => {
        if (result.length > 0) {
            return res.status(400).json({
                error: `You can not use this name: ${name}.It may have been used before...`
            })
        } else {
            Tag.findByIdAndUpdate({ _id: id }, { name: name, slug: slug }, { upsert: true }).catch(err => console.log(err));
            return res.json("successfully acction")
        }
    })
}

export const destroy = (req, res) => {

    try {
        const slug = req.params.slug.toLowerCase();
        return Tag.findOneAndRemove({ slug }).then(doc => {
            if (doc) {
                return res.json({

                    error: doc.name + ' --removed successfuly'
                })
            }
            return res.status(400).json({
                error: "not found tag with this slug..."
            })
        });

    } catch (error) {
        return res.status(400).json({
            error: errorHandler(error)
        })
    }
}

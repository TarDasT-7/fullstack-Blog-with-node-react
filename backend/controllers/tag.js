import Tag from '../models/tag.js'
import slugify from 'slugify'
import { errorHandler } from '../helpers/dbErrHandler.js'

export const index = (req, res) => {
    return Tag.find({}).then(tag => {
        return res.json(tag);
    });
}

export const store = (req, res) => {

    const { name } = req.body;
    const slug = slugify(name).toLowerCase();

    Tag.findOne({ 'slug': slug }).then(result => {
        if (result) {
            return res.status(400).json({
                message: "You already created a tag with this name and slug"
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

    return Tag.findOne({ slug }).then(tag => {

        if (!tag) {
            return res.status(400).json({
                message: 'we not found any tag with this slug...'
            })
        }
        return res.json(tag);
    });
}

export const update = (req, res) => {

    const slugParam = req.params.slug.toLowerCase();
    const { name } = req.body;
    const slug = slugify(name).toLowerCase();

    if (slugParam !== slug) {
        Tag.findOneAndUpdate({ slug: slugParam }, { name, slug }, { new: true });
        return res.json("successfully acction")
    }
    return res.status(400).json({
        message: `There seems to be a problem.If you *Really want to edit the tag*, Find the tag by *SLUG* and enter a *NEW NAME* for your tag.Try again...`
    })

}

export const destroy = (req, res) => {

    try {
        const slug = req.params.slug.toLowerCase();
        return Tag.findOneAndRemove({ slug }).then(doc => {
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
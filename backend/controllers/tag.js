<<<<<<< HEAD
import Tag from '../models/tag.js'
=======
import Tag from "../models/tag.js";
>>>>>>> 9421d473b8611e24f4461ab0f77985704a900484
import slugify from 'slugify'
import { errorHandler } from '../helpers/dbErrHandler.js'

export const index = (req, res) => {
<<<<<<< HEAD
    return Tag.find({}).then(tag => {
        return res.json(tag);
=======
    return Tag.find({}).then(cate => {
        return res.json(cate);
>>>>>>> 9421d473b8611e24f4461ab0f77985704a900484
    });
}

export const store = (req, res) => {

    const { name } = req.body;
    const slug = slugify(name).toLowerCase();

    Tag.findOne({ 'slug': slug }).then(result => {
        if (result) {
            return res.status(400).json({
<<<<<<< HEAD
                message: "You already created a tag with this name and slug"
=======
                error: "You already created a tag with this name and slug"
>>>>>>> 9421d473b8611e24f4461ab0f77985704a900484
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

<<<<<<< HEAD
    return Tag.findOne({ slug }).then(tag => {

        if (!tag) {
            return res.status(400).json({
                message: 'we not found any tag with this slug...'
            })
        }
        return res.json(tag);
=======
    return Tag.findOne({ slug }).then( item => {

        if (!item) {
            return res.status(400).json({
                error: 'we not found any tag with this slug...'
            })
        }
        return res.json(item);
>>>>>>> 9421d473b8611e24f4461ab0f77985704a900484
    });
}

export const update = (req, res) => {

<<<<<<< HEAD
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

=======
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
>>>>>>> 9421d473b8611e24f4461ab0f77985704a900484
}

export const destroy = (req, res) => {

    try {
        const slug = req.params.slug.toLowerCase();
        return Tag.findOneAndRemove({ slug }).then(doc => {
            if (doc) {
                return res.json({
<<<<<<< HEAD
                    message: doc.name + ' --removed successfuly'
                })
            }
            return res.status(400).json({
                error: "not found category with this slug..."
=======
                    error: doc.name + ' --removed successfuly'
                })
            }
            return res.status(400).json({
                error: "not found tag with this slug..."
>>>>>>> 9421d473b8611e24f4461ab0f77985704a900484
            })
        });

    } catch (error) {
        return res.status(400).json({
            error: errorHandler(error)
        })
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 9421d473b8611e24f4461ab0f77985704a900484

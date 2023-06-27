import Blog from "../models/blog.js";
import Category from "../models/category.js";
import Tag from "../models/tag.js";

import formidable, { IncomingForm } from 'formidable';
import { stripHtml } from 'string-strip-html';
import _ from 'lodash';
import slugify from 'slugify'
import fs from 'fs'

import { errorHandler } from '../helpers/dbErrHandler.js'
import { blogCreateValidator } from "../validators/blog.js";
import { SmartTrim } from "../helpers/blog.js";


export const index = (req, res) => {
    //     return Blog.find({}).then(item => {
    //         return res.json(item);
    //     });
}

export const store = (req, res) => {

    const form = new IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;

    form.parse(req, (err, fields, files) => {

        if (err) {
            return res.status(400).json({
                error: "Image could not upload..."
            })
        }
        const { title, body, categories, tags } = fields;

        const checkValidation = blogCreateValidator(title, body, categories, tags);

        if (checkValidation.length > 0) {
            return res.status(400).json({
                error: checkValidation
            })
        }

        let blog = new Blog();
        blog.slug = slugify(title[0]).toLowerCase();

        blog.title = title[0];
        blog.body = body[0];
        blog.excerpt = SmartTrim(body[0], 320, ' ', ' ...');
        blog.mtitle = `${title[0]} | ${process.env.APP_NAME}`;
        blog.mdescription = stripHtml(body[0].substring(0, 160)).result;
        blog.postedBy = req.auth._id;

        // category and tag
        const arrayOfCategories = categories && categories[0].split(',')
        const arrayOfTags = tags && tags[0].split(',')

        if (files.photo) {

            if (files.photo.size > process.env.MAX_PHOTO_SIZE) {
                return res.status(400).json({
                    error: "Image should be less then 1mb in size"
                })
            }
            blog.photo.data = fs.readFileSync(files.photo[0].filepath);
            blog.photo.contentType = files.photo[0].mimetype;
        }

        blog.save().then((data) => {
            if (!data) {
                return res.status(400).json({
                    error: 'error from server when as save new blog'
                })
            }
            Blog.findByIdAndUpdate(data._id, { $push: { categories: arrayOfCategories } }, { new: true }).then(result => {
                Blog.findByIdAndUpdate(data._id, { $push: { tags: arrayOfTags } }, { new: true }).then(result => {
                    return res.json(result)
                }).catch(error => {
                    return res.status(400).json({
                        error: errorHandler(error)
                    })
                })
            }).catch(error => {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            })
        }).catch(error => {
            if (error.code === 11000) {
                return res.status(400).json({
                    message: `You already have a blog with this ' ${Object.keys(error.keyValue)[0]} : ${Object.values(error.keyValue)[0]}'.`,
                    error: errorHandler(error)
                })
            } else {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
        })

    })

}

export const show = (req, res) => {

    //     const slug = req.params.slug.toLowerCase();


    //     return Blog.findOne({ slug }).then(item => {

    //         if (!item) {
    //             return res.status(400).json({
    //                 error: 'we not found any tag with this slug...'
    //             })
    //         }
    //         return res.json(item);
    //     });
}

export const update = (req, res) => {


    //     const id = req.params.id;

    //     const { name } = req.body;
    //     const slug = slugify(name).toLowerCase();

    //     Blog.find({ slug }).then(result => {
    //         if (result.length > 0) {
    //             return res.status(400).json({
    //                 error: `You can not use this name: ${name}.It may have been used before...`
    //             })
    //         } else {
    //             Blog.findByIdAndUpdate({ _id: id }, { name: name, slug: slug }, { upsert: true }).catch(err => console.log(err));
    //             return res.json("successfully acction")
    //         }
    //     })
}

export const destroy = (req, res) => {

    //     try {
    //         const slug = req.params.slug.toLowerCase();
    //         return Blog.findOneAndRemove({ slug }).then(doc => {
    //             if (doc) {
    //                 return res.json({

    //                     error: doc.name + ' --removed successfuly'
    //                 })
    //             }
    //             return res.status(400).json({
    //                 error: "not found tag with this slug..."
    //             })
    //         });

    //     } catch (error) {
    //         return res.status(400).json({
    //             error: errorHandler(error)
    //         })
    //     }
}

import Blog from "../models/blog.js";
import Category from "../models/category.js";
import Tag from "../models/tag.js";

import formidable, { IncomingForm } from 'formidable';
import { stripHtml } from 'string-strip-html';
import _ from 'lodash';
import slugify from 'slugify'
import fs from 'fs'

import { errorHandler } from '../helpers/dbErrHandler.js'
import { blogCreateValidator, blogUpdateValidator } from "../validators/blog.js";
import { SmartTrim } from "../helpers/blog.js";
import { SizeHandler } from "../helpers/sizeHandler.js";

export const index = (req, res) => {
    return Blog.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
        .then(data => {
            res.json(data);
        });
}

export const store = (req, res) => {

    const form = new IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;
    form.fileupload = true;


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
                    error: `Image should be less then ${SizeHandler(process.env.MAX_PHOTO_SIZE)} in size`
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

    const slug = req.params.slug.toLowerCase();

    return Blog.findOne({ slug })
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title body slug mdescription mtitle categories tags postedBy createdAt updatedAt')
        .then(item => {

            if (!item) {
                return res.status(400).json({
                    error: 'we not found any blog with this slug...'
                })
            }
            return res.json(item);
        });
}

export const update = (req, res) => {

    const slug = req.params.slug.toLowerCase();
    const form = new IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;
    form.fileupload = true;

    form.parse(req, (err, fields, files) => {

        if (err) {
            return res.status(400).json({
                error: "Image could not upload..."
            })
        }

        const { title, body, categories, tags } = fields;

        const checkValidation = blogUpdateValidator(title, body, categories, tags);

        if (checkValidation.length > 0) {
            return res.status(400).json({
                error: checkValidation
            })
        }

        const NEWtitle = title[0];
        const NEWbody = body[0];
        const NEWexcerpt = SmartTrim(body[0], 320, ' ', ' ...');
        const NEWmdescription = stripHtml(body[0].substring(0, 160)).result;
        let NEWphoto;
        const arrayOfCategories = categories && categories[0].split(',')
        const arrayOfTags = tags && tags[0].split(',')

        if (files.photo) {

            if (files.photo.size > process.env.MAX_PHOTO_SIZE) {
                return res.status(400).json({
                    error: `Image should be less then ${SizeHandler(process.env.MAX_PHOTO_SIZE)} in size`
                })
            }
            NEWphoto = {
                data: fs.readFileSync(files.photo[0].filepath),
                contentType: files.photo[0].mimetype
            }
        }

        const update = { title: NEWtitle, body: NEWbody, excerpt: NEWexcerpt, mdescription: NEWmdescription, photo: NEWphoto, categories: arrayOfCategories, tags: arrayOfTags };

        Blog.findOneAndUpdate({ slug }, update, { new: true }).then(data => {

            if (!data) {
                return res.status(400).json({
                    error: 'error from server when as update blog'
                })
            }
            return res.json(data)
        })
    })
}

export const destroy = (req, res) => {

    try {
        const slug = req.params.slug.toLowerCase();
        return Blog.findOneAndRemove({ slug }).then(doc => {
            if (doc) {
                return res.json({

                    message: doc.title + ' removed successfuly'
                })
            }
            return res.status(400).json({
                error: "not found blog with this slug..."
            })
        });

    } catch (error) {
        return res.status(400).json({
            error: errorHandler(error)
        })
    }
}

export const listAllBlogCategoryTag = (req, res) => {

    const limit = req.body.limit ? parseInt(req.body.limit) : 10;
    const skip = req.body.limit ? parseInt(req.body.skip) : 0;

    let blogs;
    let categories;
    let tags;

    Blog.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username profile')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
        .then(b => {
            blogs = b;
            Category.find({})
                .then(c => {
                    categories = c;

                    Tag.find({})
                        .then(t => {
                            tags = t;

                            res.json({
                                blogs, categories, tags, size: blogs.length
                            })
                        })
                })
        });
}

export const photo = (req, res) => {

    const slug = req.params.slug.toLowerCase();
    Blog.findOne({ slug }).select('photo').then(result => {
        if (!result) {
            return res.status(404).json({
                error: 'we not found any blog with this slug...'
            })
        }
        res.set('Content-Type', result.photo.contentType)
        return res.send(result.photo.data)
    })

}

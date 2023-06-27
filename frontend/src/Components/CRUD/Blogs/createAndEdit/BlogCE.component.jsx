import React, { Fragment, useEffect, useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from 'react-quill';
import { MultiSelect } from "react-multi-select-component";

import { index as getCategories } from "../../../../Actions/Category";
import { index as getTags } from "../../../../Actions/Tag";
import { store } from "../../../../Actions/Blog";

import '../../../../Style/quill.css'
import classes from './BlogCE.module.scss'

import { modules, formats } from "../../../../Helpers/Quill";
import { getCookie } from "../../../../Actions/Auth";
import { MAX_PHOTO_SIZE } from "../../../../config";
import SizeHandler from "../../../../Helpers/SizeHandler";
import { blogFromLocalStorage, cancleForm } from './BCEMethods'

export const CreateBlogComponent = () => {

    const formData = new FormData()
    const history = useNavigate();
    const token = getCookie('token')
    const [body, setBody] = useState(null);
    const [title, setTitle] = useState(null);
    const [file, setFile] = useState(null);
    const [fileInfo, setFileInfo] = useState({ name: "Choose a photo", size: 0 });
    const [errorInp, setErrorInp] = useState({ title: "", photo: "", body: "", categories: "", tags: "" });
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [fetchCategories, setFetchCategories] = useState([]);
    const [fetchTags, setFetchtTags] = useState([]);
    const [optionCategories, setOptionCategories] = useState([]);
    const [optionTags, setOptionTags] = useState([]);


    const validation = data => {

        setErrorInp({ title: "", photo: "", body: "", categories: "", tags: "" })
        const { title, body, file, categories, tags } = data;
        let result = Array();
        let checkValidation = [];
        let i = 0;
        let titleErr, bodyErr, cateErr, tagErr, photoErr = '';
        if (!title || !title.length) {
            result[i] = {
                title: 'title',
                success: false,
                message: 'Title is required'
            }
            titleErr = result[i].message;
            i++;
        }

        if (!body || body.length < 200) {
            result[i] = {
                title: 'body',
                success: false,
                message: 'Content is too short'
            }
            bodyErr = result[i].message;
            i++;
        }

        if (!categories || categories.length === 0) {
            result[i] = {
                title: 'categories',
                success: false,
                message: 'At least one categry is required'
            }
            cateErr = result[i].message;
            i++;
        }

        if (!tags || tags.length === 0) {
            result[i] = {
                title: 'tags',
                success: false,
                message: 'At least one tag is required'
            }
            tagErr = result[i].message;
            i++;
        }

        if (file) {
            if (file.size > MAX_PHOTO_SIZE) {
                result[i] = {
                    title: 'photo',
                    success: false,
                    message: 'photo size should be maximum 1.7 mb'
                }
                photoErr = result[i].message;
                i++;
            }
        }

        result.forEach((item, i) => {
            if (item.success === false) {
                checkValidation.push({ title: item.title, message: item.message });
            }
            setErrorInp({ title: titleErr, body: bodyErr, categories: cateErr, tags: tagErr, photo: photoErr })
        })
        return checkValidation;
    }

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setFetchCategories(data);
            }
        })
    }

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setFetchtTags(data);
            }
        })
    }

    const showCategories = (data) => {

        let arrayOfCategories = Array();

        if (data.length > 0) {

            data.map(item => {
                arrayOfCategories.push({ label: item.name, value: item._id })
            })
        }
        setOptionCategories(arrayOfCategories)
    }

    const showTag = (data) => {
        let arrayOfTags = Array();

        if (data.length > 0) {

            data.map(item => {
                arrayOfTags.push({ label: item.name, value: item._id })
            })
        }
        setOptionTags(arrayOfTags)
    }

    const changeHandler = name => e => {
        switch (name) {
            case 'title':
                setTitle(e.target.value)
                break;
            case 'photo':
                let fileName = '';
                let size = e.target.files[0] ? SizeHandler(e.target.files[0].size) : ''
                if (e.target.value.length > 30) {
                    fileName = e.target.value.split('fakepath\\')[1].substring(0, 30) + '...' || 'Choose a photo'
                } else {
                    fileName = e.target.value.split('fakepath\\')[1] || 'Choose a photo'
                }
                setFileInfo({ ...fileInfo, name: fileName, size })
                setFile(e.target.files[0])
                break;
            case 'body':
                setBody(e)
                if (typeof window !== 'undefined') {
                    localStorage.setItem('blog', JSON.stringify(e))
                }
                break;
            default:
                break;
        }

    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        let categoriesCustomize = '';
        let tagsCustomize = '';
        const blog = { title, body, file, categories, tags, }

        if (validation(blog).length > 0) return;

        categories.map((item, i) => {
            if (categories.length > i + 1)
                categoriesCustomize += item.value + ','
            else
                categoriesCustomize += item.value
        })
        tags.map((item, i) => {
            if (tags.length > i + 1)
                tagsCustomize += item.value + ','
            else
                tagsCustomize += item.value
        })

        // ---------------------------
        formData.append('title', title)
        formData.append('photo', file)
        formData.append('body', body)
        formData.append('categories', categoriesCustomize)
        formData.append('tags', tagsCustomize)
        // ---------------------------

        store(formData, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                localStorage.removeItem('blog')
                document.getElementsByClassName("ql-editor")[0].innerHTML = null;
                history('/admin/blogs')
            }
        }).catch(error => {
            console.log('catch component ' + error);
        });

    }

    useEffect(() => {
        initCategories()
        initTags()
        setBody(blogFromLocalStorage())
    }, [window])

    useEffect(() => {
        showCategories(fetchCategories)
        showTag(fetchTags)
    }, [fetchTags])

    return (
        <div className={classes.box}>
            <div className={classes.form_box}>
                <div className={classes.header_box}>
                    <div className={classes.title}>
                        <h1 > Create new blog </h1>
                    </div>
                    <div className={classes.cancle}>
                        <Link onClick={cancleForm} to="/admin/blogs" > Cancle </Link>
                    </div>
                </div>
                <div className={classes.content_box}>
                    <form onSubmit={formSubmitHandler}>

                        <div className={classes.form_input}>
                            <div className={classes.inp_regular}>
                                <label htmlFor="title">Title</label>
                                {errorInp.title ? <span className={classes.valid_err}>{errorInp.title}</span> : ''}
                                <input onChange={changeHandler('title')} value={title || ''} name="title" type="text" placeholder="enter title..." />

                                <label htmlFor="photo">Photo (maximum size 1.7mb)</label>
                                {errorInp.photo ? <span className={classes.valid_err}>{errorInp.photo}</span> : ''}
                                <div className={classes.openFileInp} onClick={() => {
                                    document.getElementsByName('photo')[0].click()
                                }}>
                                    <input onChange={changeHandler('photo')} name="photo" type="file" accept="image/*" hidden />

                                    <span> {fileInfo.name} </span>
                                    {fileInfo.size ?
                                        <Fragment>
                                            <hr />
                                            <span>{fileInfo.size}</span>
                                        </Fragment>
                                        : ''
                                    }
                                </div>

                            </div>
                            <div className={classes.selection}>

                                <label htmlFor="categories">Categories</label>
                                {errorInp.categories ? <span className={classes.valid_err}>{errorInp.categories}</span> : ''}
                                <MultiSelect
                                    name='categories'
                                    options={optionCategories}
                                    value={categories}
                                    onChange={setCategories}
                                    labelledBy="Select"
                                />
                                <br />
                                <label htmlFor="tags">Tags</label>
                                {errorInp.tags ? <span className={classes.valid_err}>{errorInp.tags}</span> : ''}
                                <MultiSelect
                                    name='tags'
                                    options={optionTags}
                                    value={tags}
                                    onChange={setTags}
                                    labelledBy="Select"
                                />
                            </div>
                            <button className={classes.sub_btn}>Save</button>
                        </div>

                        <label className={classes.body_label} htmlFor="body">Body</label>
                        {errorInp.body ? <span className={classes.valid_err}>{errorInp.body}</span> : ''}
                        <div className={classes.form_quill}>
                            <ReactQuill value={body || ''} onChange={changeHandler('body')} modules={modules} name="body" formats={formats} placeholder="write something amazing..." />
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );

}


export const EditBlogComponent = () => { }
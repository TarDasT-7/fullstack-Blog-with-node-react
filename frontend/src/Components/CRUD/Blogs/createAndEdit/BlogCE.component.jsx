import React, { Fragment, useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import ReactQuill, { Quill } from 'react-quill';

import { index as getTags } from "../../../../Actions/Tag";
import { index as getCategories } from "../../../../Actions/Category";
import { store } from "../../../../Actions/Blog";

import '../../../../Style/quill.css'
import classes from './BlogCE.module.scss'
import { ToolbarOption, formats } from "../../../../Data/Quill";


export const CreateBlogComponent = () => {

    const [body, setBody] = useState(null);
    const [title, setTitle] = useState();
    const [file, setFile] = useState();

    const blogFromLocalStorage = () => {
        if (typeof window === 'undefined') {
            return false
        }
        const getBlogFromLocalStorage = localStorage.getItem('blog');

        if (getBlogFromLocalStorage && getBlogFromLocalStorage !== null) {
            if (window.confirm('Do you want to continue your unfinished blog?')) {
                return JSON.parse(localStorage.getItem('blog'))
            } else {
                localStorage.removeItem('blog')
                document.getElementsByClassName("ql-editor")[0].innerHTML = null;
            }
        } else {
            return false
        }
    }

    useEffect(() => {
        setBody(blogFromLocalStorage())
    }, [window])

    const changeHandler = name => e => {
        switch (name) {
            case 'title':
                setTitle(e.target.value)
                break;
            case 'photo':
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

    const cancleForm = () => {
        localStorage.removeItem('blog')
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();

    }

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
                            <label htmlFor="title">Title</label>
                            <input onChange={changeHandler('title')} value={title || ''} name="title" type="text" placeholder="enter title..." />
                            <button>Save</button>
                        </div>

                        <label className={classes.body_label} htmlFor="body">Body</label>
                        <div className={classes.form_quill}>
                            <ReactQuill value={body || ''} onChange={changeHandler('body')} modules={CreateBlogComponent.modules} name="body" formats={CreateBlogComponent.formats} placeholder="write something amazing..." />
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );


}
CreateBlogComponent.modules = {
    toolbar: ToolbarOption,
}

CreateBlogComponent.formats = formats;


export const EditBlogComponent = () => { }
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill, { Quill } from 'react-quill';

import { index as getTags } from "../../../../Actions/Tag";
import { index as getCategories } from "../../../../Actions/Category";
import { store } from "../../../../Actions/Blog";

import '../../../../Style/quill.css'
import classes from './BlogCE.module.scss'

export const CreateBlogComponent = () => {




    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(0);

    }

    return (
        <div className={classes.box}>
            <div className={classes.form_box}>
                <div className={classes.header_box}>
                    <div className={classes.title}>
                        <h1 > Create new blog </h1>
                    </div>
                    <div className={classes.cancle}>
                        <Link to="/admin/blogs" > Cancle </Link>
                    </div>
                </div>
                <div className={classes.content_box}>
                    <form onSubmit={formSubmitHandler}>

                        <div className={classes.form_input}>
                            <label htmlFor="title">Title</label>
                            <input name="title" type="text" placeholder="enter title..." />
                            <button>Save</button>
                        </div>

                        <div className={classes.form_quill}>
                            <ReactQuill placeholder="write something amazing..." />
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );


}


export const EditBlogComponent = () => { }
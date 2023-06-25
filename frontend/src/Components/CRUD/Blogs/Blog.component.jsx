import React,{ useEffect, useState } from "react";
// import { CategoryDelete, CategoryEdit, CategoryForm } from "./BlogMethods";


import classes from './Blog.module.scss'
import { index } from "../../../Actions/Blog";
import { Link } from "react-router-dom";


export const IndexBlog = () => {

    const [content, setContent] = useState();



    function createTable() {
        index().then((data) => {
            if (data.length > 0) {
                return setContent(
                    <div className={classes.table}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {/* {data.map(item => (
                                    <tr key={item.slug} id={`trId_${item.slug}`}>

                                        <td>{item.name}</td>
                                        <td>{item.slug}</td>
                                        <td className={classes.actions_bar}>
                                            <span onClick={() => contentHandler('EDIT', item.slug)} className={classes.actions_edit}>edit</span>
                                            <span onClick={() => contentHandler('DELETE', item.slug)} className={classes.actions_delete}>delete</span>
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>

                        </table>
                    </div>
                )
            } else {
                setContent(
                    <div style={{ margin: 'auto' }}>
                        <h4>
                            No categories have been saved yet
                        </h4>
                    </div>
                );

            }
        }).catch(error => console.log(error));
    }


    useEffect(() => {
        return createTable();
    }, [])
    

    return (
        <div className={classes.box}>
            <div className={classes.box_header}>
                <div className={classes.header_title}>
                    <h1> Blog </h1>
                </div>

                <div className={classes.header_actions}>
                    <Link to="/admin/blogs/create" className={classes.make}> New Blog </Link>
                </div>
            </div>

            <div className={classes.box_body}>
                {content}
            </div>
        </div>
    );
}



import React, { useEffect, useState } from "react";
import classes from './Blog.module.scss'
import { destroy, index } from "../../../Actions/Blog";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../../config";
import { getCookie } from "../../../Actions/Auth";


export const IndexBlog = () => {

    const [content, setContent] = useState();
    const history = useNavigate();

    function contentHandler(param, key) {

        if (param === 'EDIT') {
            history(`/admin/blogs/edit/${key}`)

        } else if (param === 'DELETE') {
            const token = getCookie('token')
            destroy(key, token);
            document.getElementById(`trId_${key}`).remove();
        }
    }

    function createTable() {
        index().then((data) => {
            if (data.length > 0) {
                return setContent(
                    <div className={classes.table}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Photo</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(item => (
                                    <tr key={item.slug} id={`trId_${item.slug}`}>

                                        <td>{item.title}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <img src={`${API}/blog/photo/${item.slug}`} alt={item.slug} style={{ width: "100px" }} />
                                        </td>
                                        <td className={classes.actions_bar}>
                                            <span onClick={() => contentHandler('EDIT', item.slug)} className={classes.actions_edit}>edit</span>
                                            <span onClick={() => contentHandler('DELETE', item.slug)} className={classes.actions_delete}>delete</span>
                                        </td>
                                    </tr>
                                ))}
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



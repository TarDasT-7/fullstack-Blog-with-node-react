import React,{ useEffect, useState } from "react";
import { TagDelete, TagEdit, TagForm } from "./TagMethods";


import classes from './Tag.module.scss'
import { index } from "../../../Actions/Tag";


export const IndexTag = () => {

    const [body, setBody] = useState('Table')
    const [content, setContent] = useState();

    useEffect(() => {
        return contentHandler('TABLE');
    }, [])

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

                                {data.map(item => (
                                    <tr key={item.slug} id={`trId_${item.slug}`}>

                                        <td>{item.name}</td>
                                        <td>{item.slug}</td>
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
                            No tags have been saved yet
                        </h4>
                    </div>
                );

            }
        }).catch(error => console.log(error));
    }

    function contentHandler(param, slug) {

        if (param === 'TABLE') {
            setBody('Table')
            createTable();

        } else if (param === 'CREATE') {
            setBody('CreateForm')
            setContent(<TagForm />)

        } else if (param === 'CLOSE') {
            setBody('Table')
            createTable();
        } else if (param === 'EDIT') {
            setBody('EditForm')
            setContent(<TagEdit slug={slug} />)

        } else if (param === 'DELETE') {
            TagDelete(slug);
            document.getElementById(`trId_${slug}`).remove();
        }

    }
    return (
        <div className={classes.box}>
            <div className={classes.box_header}>
                <div className={classes.header_title}>
                    <h1> Tag </h1>
                </div>

                <div className={classes.header_actions}>
                    {body !== 'CreateForm' && body !== 'EditForm' ? <span className={classes.make} onClick={() => contentHandler('CREATE')}> New Item </span> : ''}
                    {body === 'CreateForm' || body === 'EditForm' ?
                        <span className={classes.cancle} onClick={() => contentHandler('CLOSE')}> Close </span>
                        : ''}
                </div>
            </div>

            <div className={classes.box_body}>
                {body === 'Table'}
                {content}
            </div>
        </div>
    );
}



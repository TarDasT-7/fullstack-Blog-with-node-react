import { useState, useEffect } from 'react';
import classes from './Category.module.scss'
import { store, index, find, update, destroy } from '../../../Actions/Category';

import { getCookie } from "../../../Actions/Auth";


const alertMessageHandler = (type, message, id) => {

    if (type === 'success') {
        return (
            <div className={classes.success_alert} key={id} id={`alertId_${id}`} onClick={(e) => {
                document.getElementById(`alertId_${id}`).remove();
            }}>
                <p> {message} </p>
            </div>
        );

    } else {
        return (
            <div className={classes.error_alert} key={id} id={`alertId_${id}`} onClick={(e) => {
                document.getElementById(`alertId_${id}`).remove();
            }}>
                <p> {message} </p>
            </div>
        );
    }

}

export const CategoryForm = () => {

    const [value, setValue] = useState()

    const [results, setResults] = useState([]);
    const [actionBtnStatus, setActionBtnStatus] = useState(false);


    const name = value;
    const token = getCookie('token')

    const submitHandler = (e) => {
        e.preventDefault();
        const id = Math.ceil(1000 * Math.random());

        store({ name }, token).then((data) => {
            if (data.error) {
                return setResults([...results, alertMessageHandler('error', data.error, id)])
            } else {
                setValue('')
                setActionBtnStatus(false)
                return setResults([...results, alertMessageHandler('success', `category " ${data.name} " was created successfully`, id)])
            }
        }).catch(error => console.log(error));

    }

    const changeHandler = (e) => {
        setValue(e.target.value)
        if (e.target.value.trim().length > 0) {
            setActionBtnStatus(true)
        } else {
            setActionBtnStatus(false)
        }
    }




    return (
        <div className={classes.form_box}>
            <div className={classes.form}>
                <form onSubmit={submitHandler}>
                    <label htmlFor="name">Category Name</label>
                    <input value={name} onChange={changeHandler} name="name" type="text" placeholder="Enter category name..." />

                    <button disabled={!actionBtnStatus} type='submit'>Save</button>
                </form>
            </div>
            <div className={classes.result_form}>
                {results}
            </div>

        </div>

    )

}

export const CategoryEdit = (props) => {

    const slug = props.slug;
    const [error, setError] = useState()
    const [notFound, setNotFound] = useState(null)
    const [value, setValue] = useState('')
    const [categoryName, setCategoryName] = useState(null)
    const [categoryID, setCategoryID] = useState(null)
    const token = getCookie('token')


    useEffect(() => {
        find(slug).then(data => {
            if (data.error) {
                setNotFound(true);

                return setError(
                    <div className={classes.not_found}>
                        <h1>
                            "{slug}" ???  <br /> {data.error}
                        </h1>
                    </div>
                )

            } else {
                setCategoryID(data._id)
                setValue(data.name)
                setCategoryName(data.name)
                return
            }
        });
    }, [])

    if (notFound === true) {
        return error;
    }
    const name = value;

    const submitHandler = (e) => {
        e.preventDefault();

        if (name !== categoryName) {
            update(categoryID, name, token).then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setError(false);
                }
            });
        }

    }

    const changeHandler = (e) => {
        setValue(e.target.value)
    }

    if (error === false) {
        window.location.reload(false);
    }

    return (
        <div className={classes.form_box}>
            <div className={classes.form}>
                <form onSubmit={submitHandler}>
                    <label htmlFor="name">Category Name</label>
                    <input value={name} onChange={changeHandler} name="name" type="text" placeholder="Enter category name..." />

                    <button type='submit'>Update</button>
                </form>
            </div>
            <div className={classes.result_form}>
                {
                    error ?
                        alertMessageHandler('error', error, 12458)
                        : ''
                }
            </div>

        </div>

    )

}

export const CategoryDelete = (slug) => {
    const token = getCookie('token')
    destroy(slug, token).then();

    return;
}



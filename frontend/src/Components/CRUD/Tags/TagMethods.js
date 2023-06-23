import { useState, useEffect } from 'react';
import classes from './Tag.module.scss'
import { store, index, find, update, destroy } from '../../../Actions/Tag';

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

export const TagForm = () => {

    const [value, setValue] = useState('')

    const [results, setResults] = useState([]);
    const [actionBtnStatus, setActionBtnStatus] = useState(false);


    const name = value;
    const token = getCookie('token')

    const submitHandler = (e) => {
        e.preventDefault();
        const id = Math.ceil(1000 * Math.random());
        store({ name }, token).then((data) => {
            if(data)
            {
                if (data.error) {
                    return setResults([...results, alertMessageHandler('error', data.error, id)])
                } else {
                    setValue('')
                    setActionBtnStatus(false)
                    return setResults([...results, alertMessageHandler('success', `tag " ${data.name} " was created successfully`, id)])
                }
            }
        }).catch(err => {
            return 0;
        });

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
                    <label htmlFor="name">Tag Name</label>
                    <input value={name} onChange={changeHandler} name="name" type="text" placeholder="Enter tag name..." />

                    <button disabled={!actionBtnStatus} type='submit'>Save</button>
                </form>
            </div>
            <div className={classes.result_form}>
                {results}
            </div>

        </div>

    )

}

export const TagEdit = (props) => {

    const slug = props.slug;
    const [error, setError] = useState()
    const [notFound, setNotFound] = useState(null)
    const [value, setValue] = useState('')
    const [tagName, setTagName] = useState(null)
    const [tagID, setTagID] = useState(null)
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
                setTagID(data._id)
                setValue(data.name)
                setTagName(data.name)
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

        if (name !== tagName) {
            update(tagID, name, token).then((data) => {
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
                    <label htmlFor="name">Tag Name</label>
                    <input value={name} onChange={changeHandler} name="name" type="text" placeholder="Enter tag name..." />

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

export const TagDelete = (slug) => {
    const token = getCookie('token')
    destroy(slug, token).then();

    return;
}



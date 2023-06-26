import React from 'react';
import classes from './Loading.module.scss'

export const LoadingComponent = () => {
    return (
        <div className={classes.loading_box}>
            <h1>Loading...</h1>
        </div>
    );
}
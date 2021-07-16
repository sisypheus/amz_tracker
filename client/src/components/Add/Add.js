import React from 'react';
import useStyles from './styles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

const Add = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <div className={classes.buttonWrapper}>
            {user ? (
                <Link to="/alter" style={{textDecoration: 'none'}}>
                    <Button className={classes.button} size="large" variant="contained" color="primary">
                        Add an item
                    </Button>
                </Link>
            ) : (
                <Button className={classes.button} size="large" variant="contained" color="primary">
                    Signin to add an item
                </Button>
            )}
        </div>
    )
}

export default Add;
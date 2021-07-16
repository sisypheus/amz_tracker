import React from 'react';
import useStyles from './styles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

const Add = () => {
    const classes = useStyles();

    return (
        <div className={classes.buttonWrapper}>
            <Link to="/alter" style={{textDecoration: 'none'}}>
                <Button className={classes.button} size="large" variant="contained" color="primary">
                    Add an item
                </Button>
            </Link>
        </div>
    )
}

export default Add;
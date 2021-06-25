import React from 'react';
import useStyles from './styles';
import { Button } from '@material-ui/core';

const Add = () => {
    const classes = useStyles();

    return (
        <Button className={classes.button} size="xl" variant="contained" color="primary">
            Add an item
        </Button>
    )
}

export default Add;
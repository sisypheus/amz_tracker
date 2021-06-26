import React from 'react';
import useStyles from './styles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

const Add = () => {
    const classes = useStyles();

    return (
        <div style={{position: 'absolute', bottom: '50px', left:'50%', transform: 'translate(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/add" style={{textDecoration: 'none'}}>
                <Button className={classes.button} size="large" variant="contained" color="primary">
                    Add an item
                </Button>
            </Link>
        </div>
    )
}

export default Add;
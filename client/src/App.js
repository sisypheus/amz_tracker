import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import Add from './components/Add/Add';
import icon from './images/icon.svg';
import Styles from './styles';
import './style/index.css';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = Styles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Container maxWidth={false} style={{padding: '0'}}>
            <AppBar elevation={0} className={classes.appBar} position="static" color="inherit">
                <img className={classes.image} src={icon} alt="icon" height="60" />
                <Typography className={classes.heading} variant="h2" align="center">Tracker</Typography>
            </AppBar>

            <div id="background">
                {/*<Form currentId={currentId} setCurrentId={setCurrentId} /> */}
                <Grow in>
                    <Container>
                        <Grid container justify="space-between" alignItems="stretch" spacing={4}>
                            <Grid item xs={12} sm={12}>
                                <Posts setCurrentId={setCurrentId} />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>

                <Add />
            </div>
        </Container>
    )
}

export default App;
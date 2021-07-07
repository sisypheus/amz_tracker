import React, { useEffect, useState } from 'react';
import Post from './Post/Post';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    const auth = useSelector((state) => state.auth);
    const loading = useSelector((state) => state.loading);
    const classes = useStyles();

    const showIndicator = () => {
        return <CircularProgress/>
    };

    const handleShow = () => {
        if (loading == 2 && !posts.length) {
            return <Typography variant="h4" style={{margin: 'auto', width: '50%', textAlign: 'center', color: 'white'}}>No Item yet, click on the bottom button to add items.</Typography>
        } else if (loading == 2 && posts.length) {
            return (
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={5} md={4}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
                </Grid>
            )
        } else if (loading == -1) {
            if (!auth.authData)
                return <Typography variant="h4" style={{margin: 'auto', width: '50%', textAlign: 'center', color: 'white'}}>You need to sign in in order to get access to this feature.</Typography>
            else
                return <Typography variant="h4" style={{margin: 'auto', width: '50%', textAlign: 'center', color: 'white'}}>Something went wrong.</Typography>
        }
    };

    return (
        <>
            {loading == 1 || loading == 0 ? showIndicator() : handleShow()}
        </>
    );
}

export default Posts;
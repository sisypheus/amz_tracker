import React, { useEffect, useState } from 'react';
import Post from './Post/Post';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';

const Posts = () => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();
    const [firstRender, setRender] = useState(true);

    useEffect(() => {
        setRender(!firstRender);
    }, [posts]);

    const showIndicator = () => {
        if (firstRender)
            return <Typography variant="h3">No Item yet</Typography>
        return <CircularProgress />;
    };

    return (
        <>
            {!posts.length ? showIndicator() : (
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={5} md={4}>
                            <Post post={post} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}

export default Posts;
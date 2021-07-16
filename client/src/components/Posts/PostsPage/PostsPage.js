import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { getPosts } from '../../../actions/posts'
import { useDispatch } from 'react-redux';
import Add from '../../Add/Add';
import Posts from '../Posts';


const PostsPage = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <>
            <Grow in>
                <Container style={{ overflow: 'auto', maxHeight: '97%' }}>
                    <Grid container justify="space-between" alignItems="stretch" spacing={4} style={{ padding: '30px' }}>
                        <Grid item xs={12} sm={12}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>

            <Add />
        </>
    )
}

export default PostsPage;

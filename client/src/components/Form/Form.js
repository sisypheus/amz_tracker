import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { getImageUrl, getTitle } from '../../actions/image'

const Form = ({ setCurrentId, currentId }) => {
    const [formSuccess, setFormSuccess] = useState('error');
    const [alertMessage, setAlertMessage] = useState('Something went wrong');
    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({url: '', title: '', image: ''});
    const [open, setOpen] = useState(false);
    const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));

    const handleSubmit = (e) => {
        e.preventDefault();
        postData.url = encodeURI(postData.url);
        if (!verifyLink(postData.url)) {
            setFormSuccess('error');
            setAlertMessage('Something went wrong');
            setOpen(true);
            return;
        }
        fetchItem();
    }

    const fetchItem = async () => {
        const result = await Promise.all([
            getSrc(postData.url),
            getItemTitle(postData.url)
        ]);
        const data = result.filter(result => !(result instanceof Error));
        if (data.length !== 2) {
            setFormSuccess('error');
            setAlertMessage('Something went wrong');
            setOpen(true);
        } else {
            data[1].message = data[1].message.replace(/\n/g,'');
            setFormSuccess('success');
            currentId ? setAlertMessage('Item successfully edited') : setAlertMessage('Item successfully added');
            setOpen(true);
            setPostData({ ...postData, image: data[0].message, title: data[1].message });
            clearForm();
        }
    }

    const clearForm = () => {
        setPostData({ url: '', image: '', title: '' });
        setCurrentId(null);
    };

    useEffect(() => {
        if (post)
            setPostData(post);
        }, [post])
        
        useEffect(() => {
            if (postData.image && postData.title && !currentId)
                dispatch(createPost(postData));
            else if (postData.image && postData.title && currentId)
                dispatch(updatePost(currentId, postData));
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postData.image, postData.title])

    const verifyLink = (link) => {
        if (link.substring(0, 11) === 'www.amazon.') {
            link = 'https://' + link;
            return link;
        } else if (link.substring(0, 19) === 'https://www.amazon.' ||
                   link.substring(0, 15) === 'https://amazon.')
            return link;
        else
            return false;
    }

    const getSrc = (link) => { return dispatch(getImageUrl(link)); }

    const getItemTitle = (link) => { return dispatch(getTitle(link)); }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Edit' : 'Add'} an item</Typography>
                <TextField
                    name="Product url" variant="outlined" label="Product url" fullWidth
                    value={postData.url}
                    onChange={(e) => setPostData({ ...postData, url: e.target.value })}
                />
            
                <Snackbar open={open} onClose={handleClose} autoHideDuration={2000} >
                    <Alert variant="filled" severity={formSuccess}>
                        {alertMessage}
                    </Alert>
                </Snackbar>

                <Button className={classes.buttonSubmit} style={{backgroundColor: "#4caf50"}}
                variant="contained" size="large" type="submit" fullWidth>Add</Button>
            </form>
        </Paper>
    );
}

export default Form;
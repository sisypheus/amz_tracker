import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';
import { getImageUrl, getTitle } from '../../actions/image'

const Form = () => {
    const [formSuccess, setFormSuccess] = useState('error');
    const [alertMessage, setAlertMessage] = useState('Something went wrong');
    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({url: '', title: '', image: ''});
    const [open, setOpen] = useState(false);

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
            setAlertMessage('Item successfully added');
            setOpen(true);
            setPostData({ ...postData, image: data[0].message, title: data[1].message });
            clearForm();
        }
    }

    const clearForm = () => {
        setPostData({url: '', image: '', title:''});
    };

    useEffect(() => {
        if (postData.image && postData.title)
            dispatch(createPost(postData));
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
                <Typography variant="h6">Add an item</Typography>
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

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Add</Button>
            </form>
        </Paper>
    );
}

export default Form;
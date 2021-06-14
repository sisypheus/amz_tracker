import React, { useState, useEffect, useCallback } from 'react';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { TextField, Button, Typography, Paper, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../actions/posts';
import { getImageUrl } from '../../actions/image'

const Form = () => {
    const [formSuccess, setFormSuccess] = useState('error');
    const [alertMessage, setAlertMessage] = useState('Something went wrong');
    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        url: '', image: '' });
    const [open, setOpen] = useState(false);
    const imageSuccess = useSelector(state => state.image);

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

    const fetchItem = () => {
        getSrc(postData.url)
            .then((res) => {
                setFormSuccess('success');
                setAlertMessage('Item successfully added!');
                setOpen(true);
                dispatch(createPost(postData));
                clearForm();
            })
            .catch((err) => {
                setFormSuccess('error');
                setAlertMessage('Something went wrong');
                setOpen(true);
            });
        //getTitle(postData.url);
    }

    const clearForm = () => {
        setPostData({url: ''});
    };

    const verifyLink = (link) => {
        if (link.substring(0, 11) == "www.amazon.") {
            link = 'https://' + link;
            return link;
        } else if (link.substring(0, 19) == "https://www.amazon." ||
                   link.substring(0, 15) == "https://amazon.")
            return link;
        else
            return false;
    }

    const getSrc = (link) => { return dispatch(getImageUrl(link)); }

    const getTitle = (link) => { return dispatch(getTitle(link)); }

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
            
                <Snackbar open={open} onClose={handleClose} autoHideDuration={3000} >
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
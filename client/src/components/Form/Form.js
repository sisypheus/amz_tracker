import React, { useState, useEffect, useCallback } from 'react';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { TextField, Button, Typography, Paper, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../actions/posts';
import { getImageUrl } from '../../actions/image'

const Form = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const [open, setOpen] = useState(false);
    const imageSuccess = useSelector(state => state.image);

    const handleSubmit = (e) => {
        e.preventDefault();
        postData.title = encodeURI(postData.title);
        verifyAndGetSrc(postData.title)
            .then((res) => {
                console.log(res.message);
                setOpen(true);
                dispatch(createPost(postData));
                clearForm();
            })
            .catch((err) => {
                //Red ui thing
                console.error(err);
            });
    }

    const clearForm = () => {
        setPostData({title: ''});
    };

    const verifyAndGetSrc = (link) => {
        let valid = true;

        if (link.substring(0, 11) == "www.amazon.") {
            link = 'https://' + link;
            valid = true;
        } else if (link.substring(0, 15) == "https://amazon.") {
            valid = true;
        } else if (link.substring(0, 19) == "https://www.amazon.") {
            valid = true;
        } else
            return false;
        return dispatch(getImageUrl(link));
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Add an item</Typography>
                <TextField
                    name="creator" variant="outlined" label="Creator" fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
            
                <Snackbar open={open} onClose={handleClose} autoHideDuration={2000} >
                    <Alert variant="filled" severity="success">
                        Item added successfully!
                    </Alert>
                </Snackbar>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Add</Button>
            </form>
        </Paper>
    );
}

export default Form;
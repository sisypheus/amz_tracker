import React, { useState, useEffect, useCallback } from 'react';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../actions/posts';
import { getImageUrl } from '../../actions/image'

const Form = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: '' });
    let imageUrl = useSelector(state => state.image);

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = !verifyLink(postData.title);
        if (!success) {
            //red thing error la
            console.log('Incorrect link.');
        } else {
            //clear le form et ajouter le post
            dispatch(createPost(postData));
        }
    }

    const verifyLink = (link) => {
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
        dispatch(getImageUrl(link))
            .then((res) => {
                if (!res)
                    return false;
                return res.message;
            });
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

                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}
                    />
                </div>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Add</Button>
            </form>
        </Paper>
    );
}

export default Form;
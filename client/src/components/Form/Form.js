import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Snackbar, Container, CssBaseline, InputAdornment, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { getImageUrl, getTitle, getPrice } from '../../actions/image'
import { useLocation, useHistory } from 'react-router-dom';

const Form = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [showLoading, setShowLoading] = useState(0);
    const [formOpacity, setFormOpacity] = useState(1);
    const [open, setOpen] = useState(false);
    const [formSuccess, setFormSuccess] = useState('error');
    const [alertMessage, setAlertMessage] = useState('Something went wrong');
    const [postData, setPostData] = useState({ url: '', title: '', image: '', targetPrice: 0, price: -1 });
    const postId = location.state?.currentId;
    const post = useSelector((state) => (postId ? state.posts.find((p) => p._id === postId) : null));

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormOpacity(0.5);
        setShowLoading(1);
        postData.url = encodeURI(postData.url);
        if (postData.targetPrice <= 0) {
            makeFeedback('You can\'t set a negative price', false);
            setFormOpacity(1);
            setShowLoading(0);
            return;
        }   
        else if (!verifyLink(postData.url)) {
            makeFeedback('Something went wrong', false);
            setFormOpacity(1);
            setShowLoading(0);
            return;
        }
        fetchItem();
    }

    const makeFeedback = (message, success) => {
        success ? setFormSuccess('success') : setFormSuccess('error');
        setAlertMessage(message);
        setOpen(true);
    }

    const fetchItem = async () => {
        dispatch({type: 'FORM_PENDING'});
        const result = await Promise.all([
            getSrc(postData.url),
            getItemTitle(postData.url),
            getItemPrice(postData.url)
        ]);
        const data = result.filter(result => !(result instanceof Error));
        if (data.length !== 3)
            makeFeedback('Something went wrong', false);
        else {
            data[1].message = data[1].message.replace(/\n/g, '');
            setPostData({ ...postData, image: data[0].message, title: data[1].message, price: data[2].message });
            makeFeedback(postId ? 'Item successfully edited' : 'Item successfully added', true);
            dispatch({ type: 'FORM_SUCCEEDED' });
            setFormOpacity(1);
            setShowLoading(0);
            clearForm();
        }
    }

    const clearForm = () => {
        setPostData({ url: '', image: '', title: '', targetPrice: 0, price: -1});
    };

    useEffect(() => {
        if (post)
            setPostData({...postData, _id: post._id, url: post.url, targetPrice: post.targetPrice});
    }, [post])

    useEffect(() => {
        if (postData.image && postData.url && postData.title && !postId)
            dispatch(createPost(postData))
        else if (postData.image && postData.url && postData.title && postId)
            dispatch(updatePost(postId, postData));
    }, [postData.image, postData.url, postData.title])

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

    const getItemPrice = (link) => { return dispatch(getPrice(link)); }

    const handleClose = () => {
        setOpen(false);
        if (formSuccess == 'success')
            history.push('/');
    }

    return (
        <>
            <Container maxWidth="sm" className={classes.formContainer}>
                <CssBaseline />
                <div className={classes.paper}>
                    {<>
                    <Typography component="h1" variant="h5" className={classes.formTitle}>{postId ? 'Edit an item' : 'Add an item to track'}</Typography>
                    <form className={classes.form} style={{opacity: formOpacity}} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="URL"
                            value={postData.url}
                            onChange={(e) => {
                                return setPostData({ ...postData, url: e.target.value })
                            }}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Price target"
                            type="number"
                            value={postData.targetPrice}
                            onChange={(e) => setPostData({...postData, targetPrice: e.target.value})}
                            InputProps={{
                                endAdornment: (
                                    <>
                                        <InputAdornment position="start">
                                            <AddCircleIcon style={{cursor: "pointer"}} fontSize="small"
                                            onClick={() =>
                                                {
                                                    if (postData.targetPrice === '')
                                                        setPostData({...postData, targetPrice: 1})
                                                    else
                                                        setPostData({...postData, targetPrice: parseInt(postData.targetPrice) + 1})
                                                }
                                            }/>
                                        </InputAdornment>
                                        <InputAdornment position="start">
                                            <IndeterminateCheckBoxIcon style={{cursor: "pointer"}} fontSize="small"
                                            onClick={() =>
                                                {
                                                    if (postData.targetPrice === '')
                                                        setPostData({...postData, targetPrice: 0})
                                                    else {
                                                        if (!parseInt(postData.targetPrice))
                                                            setPostData({...postData, targetPrice: 0});
                                                        else
                                                            setPostData({...postData, targetPrice: parseInt(postData.targetPrice) - 1})
                                                    }
                                                }
                                            }/>
                                        </InputAdornment>
                                    </>
                                )
                            }}
                        />
                        <Button
                            type="submit"
                            size="large"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={Boolean(showLoading)}
                        >
                            Add
                        </Button>
                    </form>
                    <CircularProgress style={{opacity: showLoading}} />
                    </>}
                </div>
            </Container>

            <Snackbar open={open} onClose={handleClose} autoHideDuration={1500} >
                <Alert variant="filled" severity={formSuccess}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Form;
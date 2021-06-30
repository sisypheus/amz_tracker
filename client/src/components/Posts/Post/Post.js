import React, { useRef, useState, useEffect } from 'react';
import { CircularProgress, Card, CardActions, CardContent, CardMedia, Button, Typography, Popover, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';
import { Link } from 'react-router-dom';
import { getPrice } from '../../../actions/image'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const defaultImage = 'https://axiscoffeeshop.com/wp-content/uploads/2015/11/placeholder.jpg';
    const dispatch = useDispatch();
    const divRef = useRef();
    const [updatedPrice, setUpdatedPrice] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    
    
    const getUpdatePrice = async () => {
        const result = await getItemPrice(post.url);
        setUpdatedPrice(result?.message);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    const getItemPrice = (link) => { return dispatch(getPrice(link)); };

    useEffect(() => {
        getUpdatePrice();
    }, []);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={post.image ? post.image : defaultImage} title={post.title}
            />

            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => setAnchorEl(divRef.current)}>
                    <MoreHorizIcon fontSize="default" ref={divRef} />
                </Button>
            </div>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
            >
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))} >
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                </CardActions>

                <CardActions className={classes.cardActions}>
                    <Typography>
                        <Link to={{
                            pathname: "/add",
                            state: {
                                currentId: post._id,
                            },
                        }} style={{color: 'blue', padding: '5px 4px', textDecoration: 'none', display: 'inline-flex', letterSpacing: '0.02857em', fontSize: '0.8125em'}}>
                            <CreateIcon fontSize="small" />
                            EDIT
                        </Link>
                    </Typography>
                </CardActions>
            </Popover>

            <CardContent>
                <Typography
                    className={classes.title}
                    variant="h5"
                    gutterBottom>
                        {post.title ? (post.title.length < 79 ? post.title : post.title.substring(0, 80) + '...') : 'Unknown product'}
                    </Typography>
            </CardContent>

            <CardContent className={classes.prices}>
                {updatedPrice ?
                    post.targetPrice <= post.price ?
                        <Typography variant="h4" align="justify" style={{color: 'red', fontWeight: '500'}}>
                            <HighlightOffIcon/>
                            {post.price}€
                        </Typography>
                        :
                        <Typography variant="h4" align="justify" style={{color: 'green', fontWeight: '500'}}>
                            <DoneOutlineIcon/>
                            {post.price}€
                        </Typography>
                    :
                    <CircularProgress/>
                }

                <Typography variant="h4" align="justify" style={{color: '#007EB9'}} className={classes.align}>
                    <TrackChangesIcon/>
                    {post.targetPrice}€
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Post;
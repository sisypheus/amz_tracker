import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles';

const Post = ({ post }) => {
    const classes = useStyles();
    const defaultImage = 'https://axiscoffeeshop.com/wp-content/uploads/2015/11/placeholder.jpg';

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={post.selectedFile ? post.selectedFile : defaultImage} title={post.title}
            />

            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => {}}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>

            <CardContent>
                <Typography
                    className={classes.title}
                    variant="h5"
                    gutterBottom>
                        {post.title ? post.title : 'Unknown product'}
                    </Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {}}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;
import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

const Form = () => {
    const classes = useStyles();
    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: '' });

    const handleSubmit = () => {

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
                {/*<Button variant="contained" color="primary" size="large" type="submit" fulllWidth>Add</Button>*/}
            </form>
        </Paper>
    );
}

export default Form;
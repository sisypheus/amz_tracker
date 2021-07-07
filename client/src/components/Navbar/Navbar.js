import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useStyles from './styles';
import icon from '../../images/icon.svg';
import { useDispatch } from 'react-redux';


const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT'});
        history.go(0);
        setUser(null);
    }

    useEffect(() => {
        //const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar elevation={0} className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <img className={classes.image} src={icon} alt="icon" height="60" />
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Tracker</Typography>
            </div>

            <Toolbar className={classes.toolbar}>
                 {user ? (
                     <div className={classes.toolbar}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                     </div>
                 ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                 )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar

import React, { useState, useEffect, useRef } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AppBar, Typography, Toolbar, Avatar, Button, Popover } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useStyles from './styles';
import icon from '../../images/icon3.svg';
import { useDispatch } from 'react-redux';


const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const divRef = useRef();
    const isPhone = useMediaQuery(theme => (theme.breakpoints.down('xs')));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const handleClose = () => setAnchorEl(null);

    const logout = () => {
        handleClose();
        dispatch({ type: 'LOGOUT'});
        history.go(0);
        setUser(null);
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar elevation={0} className={classes.appBar} position="static" color="inherit">
            <Link to="/" style={{textDecoration: 'none'}}>
                <div className={classes.brandContainer}>
                    {!isPhone ? (
                        <>
                            <img className={classes.image} src={icon} alt="icon" />
                            <Typography className={classes.heading} variant="h2" align="center">Tracker</Typography>
                        </>
                    ) : (
                        <img className={classes.image} src={icon} alt="icon" />
                    )
                    }
                </div>
            </Link>

            <Toolbar className={classes.toolbar}>
                 {user ? (
                     <div className={classes.toolbar}>
                        <Avatar ref={divRef} onClick={() => setAnchorEl(divRef.current)} className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                     </div>
                 ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                 )}
            </Toolbar>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
            >
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </Popover>

        </AppBar>
    )
}

export default Navbar

import React, {useEffect, useState} from "react";
import {Link, useHistory, useLocation} from 'react-router-dom';
import {AppBar, Typography, Avatar, Toolbar, Button} from "@material-ui/core";
import memories from "../../images/memories.png";
import useStyles from './style';
import {useDispatch} from "react-redux";
import jwtDecode from "jwt-decode";

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = jwtDecode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()){
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.username} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;

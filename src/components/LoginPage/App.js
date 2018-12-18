import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HeaderBar from '../HeaderBar/HeaderBar';
import AccountCircleIcon from '@material-ui/icons/PersonPin';
import LockIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';

import Snackbar from '../Common/SnackbarComponent';
var GLOBAL = require('../../globals');

const styles = theme => ({
    button: {
        marginTop: '50px',
        margin: theme.spacing.unit,
        color: '#37474f',
        width: '290px'
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
    },
    demo: {
        height: '90vh',
        margin: 0,
        width: '100%',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            username: '',
            password: '',
            usernameValid: true,
            passwordValid: true,
            open: false,
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleClick() {
        GLOBAL.USERNAME = this.state.username;
        if (this.state.username === 'demo' && this.state.password === '1234') {
            this.setState({
                isLogin: true,
                usernameValid: true,
                passwordValid: true,
            })
        }
        else {
            this.setState({
                usernameValid: false,
                passwordValid: false,
                open: true,
            })

            setTimeout(() => {
                this.setState({ open: false, });
            }, 3000);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleLogout() {
        this.setState({
            isLogin: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            this.state.isLogin
                ? <HeaderBar handleLogout={this.handleLogout} />
                :
                <Grid
                    container
                    spacing={16}
                    className={classes.demo}
                    alignItems='center'
                    direction='column'
                    justify='center'
                >
                    <Snackbar open={this.state.open} message="Wrong Username or Password"/>

                    <Grid item>
                        <img src={require('../../images/elogow.png')} style={{ width: '250px' }} alt="eLogo" />
                    </Grid>
                    <div style={{ top: '35vh', position: 'absolute', color: '#455a64' }}>eCloudValley x Data Solution System</div>
                    <Grid item>
                        <div className={classes.margin}>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <AccountCircleIcon />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        error={!this.state.usernameValid}
                                        id="username"
                                        label="Username"
                                        className={classes.textField}
                                        value={this.state.username}
                                        margin="normal"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.margin}>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <LockIcon />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        error={!this.state.passwordValid}
                                        id="password"
                                        label="Password"
                                        type="password"
                                        className={classes.textField}
                                        value={this.state.password}
                                        onChange={e => this.handleChange(e)}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <Button variant="outlined" className={classes.button} onClick={this.handleClick.bind(this)}>
                            <NavigationIcon className={classes.extendedIcon} />
                            Login
                        </Button>
                    </Grid>
                </Grid>
        );
    }
}

export default withStyles(styles)(App);
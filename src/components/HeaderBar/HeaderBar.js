import React from 'react';
import PropTypes from 'prop-types';
import Router from '../../router';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { connect } from 'react-redux';
import { compose } from "recompose";
import { ListItems } from './titleData';

const drawerWidth = 220;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%'
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#263238'
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    flex: {
        flex: 1,
    },
    logoutButton: {
        width: '40px',
        marginLeft: '20px',
        color: '#FFFFFF',
        border: '2px solid #4CAF50',
        textTransform: 'none'
    },
    uploadButton: {
        [theme.breakpoints.up('lg')]: {
            width: '160px',
            marginLeft: '20px',
        },
        color: '#FFFFFF',
        border: '2px solid #f8bbd0',
        textTransform: 'none'
    },
    rightIcon: {
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing.unit,
        },
    }
});

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
        };

        this.handleLogout = this.handleLogout.bind(this);
        this._handleFileChange = this._handleFileChange.bind(this);
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    handleItemClick = (e) => {
        this.setState({ mobileOpen: false });
    }

    handleLogout() {
        this.props.handleLogout()
    }

    _handleFileChange(e) {
        e.preventDefault();

        let reader = new FileReader()
        let file = e.target.files[0];

        if (file != null) {
            reader.readAsText(file)
        }

        reader.onloadend = () => {

            const csv = reader.result;
            const lines = csv.split("\n");

            let dataArray = [];
            for (let i = 0; i < lines.length; i++) {
                const row = lines[i].split("\n")
                row.map(j => {
                    dataArray.push(j.split(","))
                    return null
                })
            }

            this.props.dispatch({ type: 'INCREMENT', fileName: file.name });
        }
    }

    triggerInputFile = () => this.fileInput.click()

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List onClick={this.handleItemClick}>{ListItems}</List>
                <Divider />
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon />
                        </IconButton>

                        <img src={require('../../images/elogo.png')} style={{ height: '40px' }} alt="eLogo" />

                        <Hidden smDown>
                            <div style={{ color: '#ffffff', marginLeft: '20px', }}>Data Analytics Platform</div>
                        </Hidden>

                        <Typography className={classes.flex} />

                        <label htmlFor="outlined-button-file">
                            <Button className={classes.uploadButton} onClick={this.triggerInputFile}>
                                <Hidden smDown>
                                    Upload File
                                </Hidden>
                                <CloudUploadIcon className={classes.rightIcon} />
                            </Button>
                        </label>
                        <input
                            accept=".csv, .xlsx"
                            style={{ display: 'none' }}
                            id="outlined-button-file"
                            type="file"
                            onChange={(e) => this._handleFileChange(e)}
                            onClick={(event) => {
                                event.target.value = null
                            }}
                            ref={fileInput => this.fileInput = fileInput}
                        />
                        <Button className={classes.logoutButton} onClick={this.handleLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={this.state.mobileOpen}
                    onClose={this.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Router />
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        count: state.count
    };
}

HeaderBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default compose(connect(mapStateToProps), withStyles(styles, { withTheme: true }))(HeaderBar);
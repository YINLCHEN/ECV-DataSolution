import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import { connect } from 'react-redux';
import { compose } from "recompose";

import Snackbar from '../Common/SnackbarComponent';
import CustomizedTabs from './CustomizedTabs';
import TableauDashboard from './TableauDashboard';

const styles = theme => ({
    Content: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    progress: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        margin: '-5px 0 0 -5px',
    },
    root: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed'
    },
    uploadImg: {
        width: '100px',
        height: '100px',
        resizeMode: 'cover',
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-100px 0 0 -50px',
    },
    tips: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-5px 0 0 -75px',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openTableau: false,
            openProgress: false,
            dashboard: 0
        };

        this.handleTabsChange = this.handleTabsChange.bind(this);
    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.fileName) {
            if (nextProp.fileName.length !== 0 && (nextProp.fileName === 'Superstore.csv' || nextProp.fileName === 'Superstore.xlsx')) {
                this.setState({
                    openProgress: true,
                    openTableau: false
                })

                setTimeout(() => {
                    this.setState({
                        openProgress: false,
                        openTableau: true
                    });
                }, 5000);
            }
            else {
                this.setState({ open: true });

                setTimeout(() => {
                    this.setState({ open: false, });
                }, 3000);
            }
        }
    }

    handleTabsChange(value) {
        this.setState({
            dashboard: value
        })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div style={{ height: '110vh' }} >
                <Dialog open={this.state.openProgress}>
                    <Paper className={classes.root} elevation={1}>
                        <CircularProgress className={classes.progress} color="secondary" />
                    </Paper>
                </Dialog>

                <div className={classes.Content}>
                    <Hidden lgUp>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="dashboard">Dashboard</InputLabel>
                            <Select
                                value={this.state.dashboard}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'dashboard',
                                    id: 'dashboard',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={0}>Overview</MenuItem>
                                <MenuItem value={1}>Product</MenuItem>
                                <MenuItem value={2}>Customers</MenuItem>
                                <MenuItem value={3}>Shipping</MenuItem>
                                <MenuItem value={4}>Performance</MenuItem>
                                <MenuItem value={5}>Commission Model</MenuItem>
                                <MenuItem value={6}>Order Details</MenuItem>
                                <MenuItem value={7}>Forecast</MenuItem>
                                <MenuItem value={8}>What if Forecast</MenuItem>
                            </Select>
                        </FormControl>
                    </Hidden>
                    <Hidden mdDown>
                        <CustomizedTabs handleTabsChange={this.handleTabsChange} />
                    </Hidden>
                </div>

                <Snackbar open={this.state.open} message={'Please upload a CSV file named Superstore.csv or Superstore.xlsx'} />

                <div style={{ margin: '10px' }}>
                    {this.state.dashboard === 0 ? <TableauDashboard dashboardIndex={this.state.dashboard} /> : null}
                    {this.state.dashboard === 1 ? <TableauDashboard dashboardIndex={this.state.dashboard} /> : null}
                    {this.state.dashboard === 2 ? <TableauDashboard dashboardIndex={this.state.dashboard} /> : null}
                    {this.state.dashboard === 3 ? <TableauDashboard dashboardIndex={this.state.dashboard} /> : null}
                    {this.state.dashboard === 4 ? <TableauDashboard dashboardIndex={this.state.dashboard} /> : null}
                    {this.state.dashboard === 5 ? <TableauDashboard dashboardIndex={this.state.dashboard} /> : null}
                </div>

                {this.state.openTableau
                    ?
                    <div style={{ margin: '10px' }}>
                        {this.state.dashboard === 6 ? <div style={{
                                                            textAlign:'center', 
                                                            paddingTop: '10%',
                                                            fontSize: '4vh',
                                                            fontWeight: 300,
                                                            color: '#e88eae'}}
                                                            >
                                                        Missing Source Data File</div> : null}
                        {this.state.dashboard === 7 ? <TableauDashboard dashboardIndex={this.state.dashboard} /> : null}
                        {this.state.dashboard === 8 ? <TableauDashboard dashboardIndex={this.state.dashboard} /> : null}
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        count: state.count,
        fileName: state.fileName
    };
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(connect(mapStateToProps), withStyles(styles, { withTheme: true }))(App);
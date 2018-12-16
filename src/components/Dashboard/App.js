import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Dropzone from 'react-dropzone'

// import CustomizedTabs from './CustomizedTabs';
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

const baseStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-200px 0 0 -300px',
    height: 400,
    width: 600,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
};
const activeStyle = {
    borderStyle: 'solid',
    borderColor: '#6c6',
    backgroundColor: '#eee'
};
const rejectStyle = {
    borderStyle: 'solid',
    borderColor: '#c66',
    backgroundColor: '#eee'
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openTableau: false,
            openProgress: false,
            tabsValue: 0,
            dashboard: 0
        };

        this.handleTabsChange = this.handleTabsChange.bind(this);
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

            let jsonArray = [];
            for (let i = 1; i < dataArray.length; i++) {
                let json = {
                    "id": i,
                    "0": dataArray[i][0],
                    "1": dataArray[i][1],
                    "2": dataArray[i][2],
                    "3": dataArray[i][3],
                    "4": dataArray[i][4],
                    "5": dataArray[i][5],
                    "6": dataArray[i][6],
                    "7": dataArray[i][7],
                    "8": dataArray[i][8],
                    "9": dataArray[i][9]
                }
                jsonArray.push(json);
            }
        }
    }

    handleTabsChange(value) {
        this.setState({
            tabsValue: value
        })
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        if (acceptedFiles) {
            this.setState({
                openProgress: true
            })

            setTimeout(function () { //Start the timer
                this.setState({
                    openProgress: false,
                    openTableau: true
                })
            }.bind(this), 3000)
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div style={{ height: '100vh' }} >
                <Dialog open={this.state.openProgress}>
                    <Paper className={classes.root} elevation={1}>
                        <CircularProgress className={classes.progress} color="secondary" />
                    </Paper>
                </Dialog>

                <div className={classes.Content}>
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
                            <MenuItem value={0}>Executive Dashboard</MenuItem>
                            <MenuItem value={1}>Daily Store Performance</MenuItem>
                            <MenuItem value={2}>Market Basket Analysis</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <CustomizedTabs handleTabsChange={this.handleTabsChange} /> */}
                </div>

                {!this.state.openTableau || this.state.dashboard === ''
                    ?
                    <Dropzone accept="*.csv" onDrop={this.onDrop}>
                        {({ getRootProps, getInputProps, isDragActive, isDragReject, }) => {
                            let styles = { ...baseStyle }
                            styles = isDragActive ? { ...styles, ...activeStyle } : styles
                            styles = isDragReject ? { ...styles, ...rejectStyle } : styles

                            return (
                                <div
                                    {...getRootProps()}
                                    style={styles}
                                    className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
                                >
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                            <p>Drop files here...</p> :
                                            <div>
                                                <img alt="img" src={require('../../images/upload.png')} className={classes.uploadImg} />
                                                <div className={classes.tips} >Drag & Drop files here</div>
                                            </div>
                                    }
                                </div>
                            )
                        }}
                    </Dropzone>
                    :
                    <div>
                        {this.state.dashboard === 0 ? <TableauDashboard dashboardIndex={this.state.dashboard} /> : null}
                        {this.state.dashboard === 1 ? <TableauDashboard dashboardIndex={this.state.dashboard} /> : null}
                        {this.state.dashboard === 2 ? <TableauDashboard dashboardIndex={this.state.dashboard} /> : null}
                        {this.state.dashboard === 3 ? <TableauDashboard dashboardIndex={this.state.dashboard} /> : null}
                    </div>
                }
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
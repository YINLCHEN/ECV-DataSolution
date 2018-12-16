import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import tableau from "tableau-api";

const styles = theme => ({

});

class TableauDashboard extends Component {

    initViz(index) {
        var vizUrl = '';
        switch (index) {
            case 0:
                vizUrl = 'https://public.tableau.com/views/US_Superstore_10_0/Overview?:embed=y&:loadOrderID=0&:display_count=yes';
                break;
            case 1:
                vizUrl = 'https://public.tableau.com/views/sales_192/Dashboard12?:embed=y&:display_count=yes'
                break;
            case 2:
                vizUrl = 'https://public.tableau.com/views/Sales_568/Dashboard1?:embed=y&:display_count=yes';
                break;
            default:
                vizUrl = 'https://public.tableau.com/views/US_Superstore_10_0/Overview?:embed=y&:loadOrderID=0&:display_count=yes';
                break;
        }

        const vizContainer = this.vizContainer;

        var options = {
            hideTabs: true,
            width: '100%',
            height: '100vh',
            usePublishedSize: true,
            hideToolbar: true,
            onFirstInteractive: function () {
                // The viz is now ready and can be safely used.
            }
        };

        let viz = new window.tableau.Viz(vizContainer, vizUrl, options)
    }

    componentDidMount() {
        this.initViz(this.props.dashboardIndex);
    }

    render() {
        return (
            <div ref={(div) => { this.vizContainer = div }}>
            </div>
        );
    }
}

TableauDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableauDashboard);
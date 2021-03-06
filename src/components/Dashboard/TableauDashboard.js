import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import "tableau-api";

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
                vizUrl = 'https://public.tableau.com/views/US_Superstore_10_0/Product?:embed=y&:loadOrderID=0&:display_count=yes'
                break;
            case 2:
                vizUrl = 'https://public.tableau.com/views/US_Superstore_10_0/Customers?:embed=y&:loadOrderID=0&:display_count=yes';
                break;
            case 3:
                vizUrl = 'https://public.tableau.com/views/US_Superstore_10_0/Shipping?:embed=y&:loadOrderID=0&:display_count=yes';
                break;
            case 4:
                vizUrl = 'https://public.tableau.com/views/US_Superstore_10_0/Performance?:embed=y&:loadOrderID=0&:display_count=yes';
                break;
            case 5:
                vizUrl = 'https://public.tableau.com/views/US_Superstore_10_0/CommissionModel?:embed=y&:loadOrderID=0&:display_count=yes';
                break;
            case 6:
                vizUrl = 'https://public.tableau.com/views/US_Superstore_10_0/OrderDetails?:embed=y&:loadOrderID=0&:display_count=yes';
                break;
            case 7:
                vizUrl = 'https://public.tableau.com/views/US_Superstore_10_0/Forecast?:embed=y&:loadOrderID=0&:display_count=yes';
                break;
            case 8:
                vizUrl = 'https://public.tableau.com/views/US_Superstore_10_0/WhatIfForecast?:embed=y&:loadOrderID=0&:display_count=yes';
                break;
            default:
                vizUrl = 'https://public.tableau.com/views/US_Superstore_10_0/Overview?:embed=y&:loadOrderID=0&:display_count=yes';
                break;
        }

        const vizContainer = this.vizContainer;

        var options = {
            hideTabs: true,
            width: window.innerWidth - 50,
            height: window.innerHeight - 20,
            usePublishedSize: true,
            hideToolbar: true,
            onFirstInteractive: function () {
                // The viz is now ready and can be safely used.
            }
        };

        new window.tableau.Viz(vizContainer, vizUrl, options)
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
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './components/LoginPage/App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily: "\"Microsoft JhengHei\",\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        useNextVariants: true,
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500
    },
});

ReactDOM.render(
    <Router>
        <MuiThemeProvider theme={theme}>
            <LoginPage />
        </MuiThemeProvider>
    </Router>, document.getElementById('root'));
registerServiceWorker();

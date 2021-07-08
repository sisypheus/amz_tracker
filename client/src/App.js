import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import PostsPage from './components/Posts/PostsPage/PostsPage';
import Form from './components/Form/Form';
import Base from './components/Base/Base';
import Auth from './components/Auth/Auth';
import './style/index.css';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
    spacing: defaultTheme.spacing,
    typography: {
        fontFamily: [
            'Karla',
            'sans-serif',
        ].join(','),
        fontWeight: '200',
    }
});

const App = () => {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route exact path={["/"]}>
                        <Base component={PostsPage} />
                    </Route>

                    <Route exact path={["/alter"]}>
                        <Base component={Form} />
                    </Route>

                    <Route exact path={["/auth"]}>
                        <Base component={Auth} />
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
    )
}

export default App;
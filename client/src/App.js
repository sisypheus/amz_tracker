import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PostsPage from './components/Posts/PostsPage/PostsPage';
import Form from './components/Form/Form';
import Base from './components/Base/Base';
import Auth from './components/Auth/Auth';
import './style/index.css';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={["/"]}>
                    <Base component={PostsPage} />
                </Route>

                <Route exact path={["/add"]}>
                    <Base component={Form} />
                </Route>

                <Route exact path={["/auth"]}>
                    <Base component={Auth} />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;
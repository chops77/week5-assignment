import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';

class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={PokemonList} />
                    <Route path="/pokemon/:id" component={PokemonDetail} />
                </Switch>
            </Router>
        );
    }
}

export default Routes;

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { CssBaseline, Container, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Box, IconButton } from '@material-ui/core';
import { SkipNext, SkipPrevious } from '@material-ui/icons';

class PokemonList extends Component {
    state = {
        isLoading: true,
        next: null,
        previous: null,
        results: [],
        error: ''
    }

    componentDidMount() {
        this.loadList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    }

    loadList = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    isLoading: false,
                    next: data.next,
                    previous: data.previous,
                    results: data.results
                })
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: error.message
                })
            });
    }

    listHandler = (skip) => {
        this.loadList(skip);
    } 

    render() {
        const {isLoading, next, previous, results, error} = this.state;

        return (
            <Container maxWidth="sm">
                <CssBaseline />
                <Typography variant="h3">Pokemon List</Typography>
                {isLoading && <Typography variant="h4">Loading...</Typography>}
                {error && <Typography variant="h4">{error}</Typography>}
                {previous && <IconButton onClick={() => this.listHandler(previous)}><SkipPrevious /> Previous List</IconButton>}
                {next && <IconButton onClick={() => this.listHandler(next)}> Next List<SkipNext /></IconButton>}
                <List>
                    {results.map((pokemon, idx) => {
                        const id = pokemon.url.split('/').slice(-2)[0];
                        const pokemonLink = `/pokemon/${id}`;
                        const avatarLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                        const linkText = `${id}. ${pokemon.name}`;
                        return (
                            <ListItem key={idx}>
                                <Link to={pokemonLink}>
                                    <Box display="flex">
                                        <ListItemAvatar>
                                            <Avatar alt={pokemon.name} src={avatarLink} />
                                        </ListItemAvatar>
                                        <ListItemText primary={linkText} style={{textTransform: 'capitalize'}}/>
                                    </Box>
                                </Link>
                            </ListItem>
                        );
                    })}
                </List>
            </Container>
        )
    }
}

export default PokemonList

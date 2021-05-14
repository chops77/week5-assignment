import React, { Component } from 'react'
import { CssBaseline, Button, Typography, Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

class PokemonDetail extends Component {
    state = {
        isLoading: true,
        id: null,
        detail: null,
        error: ''
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                isLoading: false,
                id: id,
                detail: data
            });
        })
        .catch((error) => {
            this.setState({
                isLoading: false,
                error: error.message
            });
        });

    }

    render() {
        const {isLoading, id, detail, error} = this.state;
        let content;

        if (detail) {
            const pokemonImage = detail.sprites.other["official-artwork"].front_default;
            const abilities = detail.abilities.map((ability) => {
                return ability.ability.name;
            })
            const types = detail.types.map((type) => {
                return type.type.name;
            })
            content = (
                <Card variant="outlined" style={{maxWidth: 500}}>
                    <CardMedia style={{height: 475}} image={pokemonImage} title={detail.name}/>
                    <CardHeader title={detail.name} style={{textTransform: 'capitalize'}}/>
                    <CardContent>
                        <Typography variant="subtitle1"> PokeDex number: <b>{id}</b> </Typography>
                        <Typography variant="subtitle1"> Height: <b>{detail.height * 10} cm</b></Typography>
                        <Typography variant="subtitle1"> Weight: <b>{detail.weight / 10} kg</b></Typography>
                        <Typography variant="subtitle1"> Abilities: <b>{abilities.join(", ")}</b> </Typography>
                        <Typography variant="subtitle1"> Types: <b>{types.join(", ")}</b> </Typography>
                    </CardContent>
                </Card>
            );
        }

        return (
            <div>
                <CssBaseline />
                <Button variant="contained">
                    <Link to="/">Back to Pokemon List</Link>
                </Button>
                <br /><br />
                {isLoading && <Typography variant="h4">Loading...</Typography>}
                {error && <Typography variant="h4">{error}</Typography>}
                {content}
            </div>
        )
    }
}

export default PokemonDetail

import React from 'react';
import ajax from 'superagent';

import Game from './Game';

class TournamentContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            game: [],
            points: [],
        }
    }

    render() {
        return <Game game={this.state.game} points={this.state.points} />
    }

    componentWillMount() {
        this.fetchGame();
    }

    fetchGame() {
        ajax.get(`http://localhost:8000/skatabend/api/tournaments/`)
            .end((error, response) => {
                if (!error && response) {
                    console.dir(response.body);
                    this.setState( prevState => {
                        prevState.game = response.body
                        return prevState });
                    this.setState( prevState => {
                        prevState.points = response.body.points
                        return prevState });
                } else {
                    console.log(`Error fetching Game`, error);
                }
            }
        );
    }
}

export default TournamentContainer;
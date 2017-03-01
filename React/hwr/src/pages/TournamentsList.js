import React from 'react';
import ajax from 'superagent';

class TournamentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: 'gamedetail',
            games: [],
        }
    }

    render() {
        /*return this.state.games.points.map((round, index) => {

        return (<p key={index}>
            <strong>{round.round}:</strong>
            <a href={round.url}>{round.play_date}</a>.
        </p>);
    });*/
    return this.state.games.map((round, index) => {
        return (<p>
            </p>);
    })
    }

    componentWillMount() {
        this.fetch('games');
    }

fetch(type) {
    ajax.get(`http://localhost:8000/skatabend/api/rounds/8/`)
        .end((error, response) => {
            if (!error && response) {
                console.dir(response.body);
                this.setState({ [type]: response.body });
            } else {
                console.log(`Error fetching ${type}`, error);
            }
        }
    );
}

}    

export default TournamentList;
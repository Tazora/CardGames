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
        let content = this.renderGame();
        return (<div>
            {content}
            </div>);
    }

    componentWillMount() {
        this.fetchGame();
    }

fetchGame() {
    ajax.get(`http://localhost:8000/skatabend/api/rounds/8/`)
        .end((error, response) => {
            if (!error && response) {
                console.dir(response.body);
                this.setState( prevState => {
                    prevState.games = response.body
                    return prevState });
            } else {
                console.log(`Error fetching Games`, error);
            }
        }
    );
}

renderGame() {
    return <p>
        1
    </p>
}

}    

export default TournamentList;
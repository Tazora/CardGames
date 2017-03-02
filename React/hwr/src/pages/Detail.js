import React from 'react';
import ajax from 'superagent';

class Detail extends React.Component {

    constructor(props) {
        super(props);

        this.chat_id = '189728887';
        this.token = '368568023:AAGt-dyMFZFkBgf8bCyfSBlZb_L_Ws0ZMzY';

        this.state = { 
            mode: 'tournaments',
            tournaments: [],
            rounds: [],
            points: [],
         };

         this.addRound = this.addRound.bind(this)
    }



render() {
    let content;
    if (this.state.mode === 'tournaments') {
        content = this.renderTournaments();
    } else if (this.state.mode === 'rounds') {
        content = this.renderRounds();
    } else {
        content = this.renderPoints();
    }

    return (<div>
            <button onClick={this.selectMode.bind(this, 'tournaments')}>Show Tournaments</button>
            <button onClick={this.selectMode.bind(this, 'rounds')}>Show Rounds</button>
            <button onClick={this.selectMode.bind(this, 'points')}>Show Points</button>
            {content}
        </div>);
    }

    componentWillMount() {
    this.fetchFeed('tournaments');
    this.fetchFeed('rounds');
    this.fetchFeed('points');
}

renderTournaments() {
    return (<div>
            {this.renderTournamentsList()};
            <button onClick={this.addRound}>Runde hinzufügen</button>
        </div>);
}

renderTournamentsList() {
    return this.state.tournaments.map((tournament, index) => {
        const name = tournament.name;

        return (<div key={index} id={tournament.id}>
            <h2>{name}:</h2>
            {tournament.rounds.map((round, index) => {
                return (<h3 key={index}>{round.id}</h3>)
            })}
        <button onClick={this.deleteRound.bind(this, index, tournament.id)}>Runde entfernen</button>
        </div>);
    });
}

renderRounds() {
    return this.state.rounds.map((round, index) => {
        const name = round.name;
        return (<p key={index}>
            <strong>{name}:</strong>
            <a href={round.url}>{name}</a>.
        </p>);
    });
}

renderPoints() {
    return this.state.points.map((point, index) => {
        const round_points_A = point.round_points_A;

        return (<p key={index}>
            <strong>{point.round}:</strong>
            <a href={point.url}>{round_points_A}</a>.
        </p>);
    });
}

selectMode(mode) {
    this.setState({ mode });
}

fetchFeed(type) {
    ajax.get(`http://localhost:8000/skatabend/api/${type}/`)
        .end((error, response) => {
            if (!error && response) {
                console.dir(response.body.results);
                this.setState({ [type]: response.body.results });
            } else {
                console.log(`Error fetching ${type}`, error);
            }
        }
    );
}

addRound() {
    ajax.post(`http://localhost:8000/skatabend/api/tournaments/`)
        .send({name: 'TestTurnier' + this.state.tournaments.length, rounds: []})
        .end((error, callback) => {
            if (!error && callback) {
                console.log(callback.body);
                this.setState((prevState) => ({
                    tournaments: prevState.tournaments.concat([callback.body])
                }));
            } else {
                console.log('Error fetching Post', error);
            }
        })
    }

deleteRound(index, id) {
    ajax.del(`http://localhost:8000/skatabend/api/tournaments/${id}/`)
    .end((error, callback) => {
        if (!error && callback) {
            console.log(callback.body);
            this.setState((prevState) => ({
                tournaments: prevState.tournaments.filter((_, i) => i !== index)
            }));
        } else {
            console.log('Error fetching Delete', error);
        }
    })
}

}   
export default Detail;
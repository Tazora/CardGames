import React from 'react';
import RoundList from './RoundList'

class Game extends React.Component {

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>{this.props.game.player_A}</th>
                        <th>{this.props.game.player_B}</th>
                        <th>{this.props.game.player_C}</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>{this.props.game.points_A}</th>
                        <th>{this.props.game.points_B}</th>
                        <th>{this.props.game.points_C}</th>
                    </tr>
                </tfoot>
                <RoundList points={this.props.points} />     
            </table>);
    }

}
export default Game;
import React from 'react';

class RoundList extends React.Component {

    render() {
        let content = this.renderGame();
        return (
            <tbody>
                {content}
            </tbody>
        )
    }
    renderGame() {
        return this.props.points.map((point, index) => {
            return (
                    <tr key={index}>
                        <td>{point.round_points_A}</td>
                        <td>{point.round_points_B}</td>
                        <td>{point.round_points_C}</td>
                    </tr>
            );
        });
    }
}

export default RoundList;
import React, { Component } from "react";
import styled from "styled-components";

const StyledTablePitching = styled.div`
    width: 100%;
`;

class TablePitching extends Component {
    render() {
        const split = this.props.split;
        return (
            <StyledTablePitching>
                <table className="u-full-width">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Team</th>
                            <th>Games Pitched</th>
                            <th>Games Started</th>
                            <th>AVG</th>
                            <th>Hits</th>
                            <th>Home Runs</th>
                            <th>Strikes</th>
                            <th>Number Of Pitches</th>
                            <th>Runs</th>
                            <th>Strike Outs</th>
                            <th>Strike Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {split.map((year, index) => (
                            <tr key={index}>
                                <td>{year.season}</td>
                                {year.team ? <td>{year.team.name}</td> : <td />}
                                <td>{year.stat.gamesPitched}</td>
                                <td>{year.stat.gamesStarted}</td>
                                <td>{year.stat.avg}</td>
                                <td>{year.stat.hits}</td>
                                <td>{year.stat.homeRuns}</td>
                                <td>{year.stat.strikes}</td>
                                <td>{year.stat.numberOfPitches}</td>
                                <td>{year.stat.runs}</td>
                                <td>{year.stat.strikeOuts}</td>
                                <td>{year.stat.strikePercentage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </StyledTablePitching>
        );
    }
}

export default TablePitching;

import React, { Component } from "react";
import styled from "styled-components";

const StyledTableFielding = styled.div`
    width: 100%;
`;

class TableFielding extends Component {
    render() {
        const split = this.props.split;
        return (
            <StyledTableFielding>
                <table className="u-full-width">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Team</th>
                            <th>Assists</th>
                            <th>Chances</th>
                            <th>Double Plays</th>
                            <th>Errors</th>
                            <th>Fielding</th>
                            <th>Games</th>
                            <th>Games Started</th>
                            <th>Innings</th>
                            <th>Put Outs</th>
                            <th>Range Factor Per Game</th>
                        </tr>
                    </thead>
                    <tbody>
                        {split.map((year, index) => (
                            <tr key={index}>
                                <td>{year.season}</td>
                                {year.team ? <td>{year.team.name}</td> : <td />}
                                <td>{year.stat.assists}</td>
                                <td>{year.stat.chances}</td>
                                <td>{year.stat.doublePlays}</td>
                                <td>{year.stat.errors}</td>
                                <td>{year.stat.fielding}</td>
                                <td>{year.stat.games}</td>
                                <td>{year.stat.gamesStarted}</td>
                                <td>{year.stat.innings}</td>
                                <td>{year.stat.putOuts}</td>
                                <td>{year.stat.rangeFactorPerGame}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </StyledTableFielding>
        );
    }
}

export default TableFielding;

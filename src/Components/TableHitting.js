import React, { Component } from "react";
import styled from "styled-components";

const StyledTableHitting = styled.div`
    width: 100%;
`;

class TableHitting extends Component {
    render() {
        const split = this.props.split;
        return (
            <StyledTableHitting>
                <table className="u-full-width">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Team</th>
                            <th>Home Runs</th>
                            <th>Hits</th>
                            <th>Rbi</th>
                            <th># Of Pitches</th>
                            <th>OBP</th>
                            <th>OPS</th>
                            <th>Plate Appearances</th>
                            <th>Runs</th>
                            <th>Strike Outs</th>
                            <th>Total Bases</th>
                        </tr>
                    </thead>
                    <tbody>
                        {split.map((year, index) => (
                            <tr key={index}>
                                <td>{year.season}</td>
                                {year.team ? <td>{year.team.name}</td> : <td />}
                                <td>{year.stat.homeRuns}</td>
                                <td>{year.stat.hits}</td>
                                <td>{year.stat.rbi}</td>
                                <td>{year.stat.numberOfPitches}</td>
                                <td>{year.stat.obp}</td>
                                <td>{year.stat.ops}</td>
                                <td>{year.stat.plateAppearances}</td>
                                <td>{year.stat.runs}</td>
                                <td>{year.stat.strikeOuts}</td>
                                <td>{year.stat.totalBases}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </StyledTableHitting>
        );
    }
}

export default TableHitting;

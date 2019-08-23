import React, { Component } from "react";
import styled from "styled-components";

// components
import StatContainer from "./StatContainer";
import TableFielding from "./TableFielding";
import TableHitting from "./TableHitting";
import TablePitching from "./TablePitching";
import List from "./List";

const StyledPlayerStats = styled.div`
    text-align: center;
    & > h2 {
        margin-bottom: 5rem;
    }
`;

class PlayerStats extends Component {
    state = {};
    render() {
        return (
            <StyledPlayerStats>
                <h2 className="fancy-underline">Player Stats</h2>
                {this.props.stats.map((stat, index) => (
                    <div key={index}>
                        {/* {stat.splits.map((split, index) => ( */}
                        <div key={index}>
                            <StatContainer statType={stat.group.displayName}>
                                {stat.group.displayName === "fielding" ? (
                                    <TableFielding split={stat.splits} />
                                ) : null}
                                {stat.group.displayName === "hitting" ? (
                                    <TableHitting split={stat.splits} />
                                ) : null}
                                {stat.group.displayName === "pitching" ? (
                                    <TablePitching split={stat.splits} />
                                ) : null}
                            </StatContainer>
                        </div>
                        {/* ))} */}
                    </div>
                ))}
            </StyledPlayerStats>
        );
    }
}

export default PlayerStats;

import React, { Component } from "react";
import styled from "styled-components";
import { stat } from "fs";

const StyledPlayerStats = styled.div``;

class PlayerStats extends Component {
    state = {};
    render() {
        return (
            <StyledPlayerStats>
                <h2 className="fancy-underline">Player Stats</h2>
                {this.props.stats.map((stat, index) => (
                    <div key={index}>
                        <h3>{stat.group.displayName}</h3>
                        {stat.splits.map((split, index) => (
                            <div key={index}>
                                <h4>{split.season}</h4>
                                <p><b>Team: </b>{split.team.name}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </StyledPlayerStats>
        );
    }
}

export default PlayerStats;

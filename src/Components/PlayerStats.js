import React, { Component } from "react";
import styled from "styled-components";

// components
import StatContainer from "./StatContainer";
import TableFielding from "./TableFielding";
import TableHitting from "./TableHitting";
import TablePitching from "./TablePitching";
import PieGraph from "./PieGraph";

const StyledPlayerStats = styled.div`
    text-align: center;
    & > h2 {
        margin-bottom: 5rem;
    }
`;

class PlayerStats extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            gpps: null
        };
        // this.calcCGGP = this.calcCGGP.bind(this);
    }
    componentDidMount() {
        // games played per stat (hitting, fielding, pitching)
        let gpps = [];
        this.props.stats.forEach((stat, index) => {
            gpps.push({ item: stat.group.displayName, frequency: 0 });
            stat.splits.forEach(split => {
                if (split.stat.gamesPlayed) {
                    gpps[index].frequency += split.stat.gamesPlayed;
                } else if (split.stat.games) {
                    gpps[index].frequency += split.stat.games;
                }
            });
        });
        console.log("gpps", gpps);
        this.setState({ gpps: gpps });
        // return gpps;
    }
    render() {
        return (
            <StyledPlayerStats>
                <h2 className="fancy-underline">Player Stats</h2>
                {this.props.stats.map((stat, index) => (
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
                ))}
                {this.state.gpps ? (
                    <PieGraph
                        title={"Games Played at Each Position"}
                        idata={this.state.gpps}
                        width={500}
                        height={500}
                        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    />
                ) : null}
            </StyledPlayerStats>
        );
    }
}

export default PlayerStats;

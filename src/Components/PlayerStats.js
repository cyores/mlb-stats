import React, { Component } from "react";
import styled from "styled-components";

// components
import StatContainer from "./StatContainer";
import TableFielding from "./TableFielding";
import TableHitting from "./TableHitting";
import TablePitching from "./TablePitching";
import PieGraph from "./Graphs/PieGraph";
import BarGraph from "./Graphs/BarGraph";
import List from "./List";

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
            gpps: null,
            rfpgpy: null
        };
        // this.calcCGGP = this.calcCGGP.bind(this);
    }
    componentDidMount() {
        // games played per stat (hitting, fielding, pitching)
        let gpps = [];
        let rfpgpy = [];
        let temp = {};
        this.props.stats.forEach((stat, index) => {
            gpps.push({ item: stat.group.displayName, frequency: 0 });
            stat.splits.forEach(split => {
                if (split.stat.gamesPlayed) {
                    gpps[index].frequency += split.stat.gamesPlayed;
                } else if (split.stat.games) {
                    gpps[index].frequency += split.stat.games;
                }
                // RFPG per year
                if (stat.group.displayName === "fielding") {
                    if (!(split.season in temp)) {
                        temp[split.season] = parseFloat(
                            split.stat.rangeFactorPerGame
                        );
                    } else {
                        temp[split.season] =
                            (temp[split.season] +
                                parseFloat(split.stat.rangeFactorPerGame)) /
                            2;
                    }
                }
            });
        });

        console.log("temp", temp);

        Object.keys(temp).forEach(key => {
            rfpgpy.push({
                x: parseInt(key),
                y: parseFloat(temp[key])
            });
        });
        console.log("gpps", gpps);
        console.log("rfpgpy", rfpgpy);

        this.setState({ gpps: gpps, rfpgpy: rfpgpy });
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
                <List>
                    {this.state.gpps ? (
                        <PieGraph
                            title={"Games Played at Each Position"}
                            idata={this.state.gpps}
                            width={700}
                            height={500}
                            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        />
                    ) : null}
                    {this.state.rfpgpy ? (
                        <BarGraph
                            title={"RFPG Per Year"}
                            leftLabel={"Range Factor Per Game"}
                            bottomLabel={"Year"}
                            idata={this.state.rfpgpy}
                            width={700}
                            height={500}
                            margin={{
                                top: 60,
                                left: 75,
                                bottom: 60,
                                right: 75
                            }}
                        />
                    ) : null}
                </List>
            </StyledPlayerStats>
        );
    }
}

export default PlayerStats;

import React, { Component } from "react";
import styled from "styled-components";

// components
import StatContainer from "./StatContainer";
import StatsTable from "./StatsTable";
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
            rfpgpy: null,
            graphWidth: 700,
            graphHeight: 500
        };
    }
    componentDidMount() {
        // games played per stat (hitting, fielding, pitching)
        let gpps = [];
        // range factor per game per year
        let rfpgpy = [];
        // temp object to help build rfpgpy
        let temp = {};
        this.props.stats.forEach((stat, index) => {
            gpps.push({ item: stat.group.displayName, frequency: 0 });
            stat.splits.forEach(split => {
                // gpps
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

        Object.keys(temp).forEach(key => {
            rfpgpy.push({
                x: parseInt(key),
                y: parseFloat(temp[key])
            });
        });

        // size the graphs according to screen width
        let width = 700;
        let height = 500;
        if (window.innerWidth < 768) {
            width = 400;
            height = 200;
        }

        this.setState({
            gpps: gpps,
            rfpgpy: rfpgpy,
            graphWidth: width,
            graphHeight: height
        });
    }
    render() {
        return (
            <StyledPlayerStats>
                <h2 className="fancy-underline">Player Stats</h2>
                {this.props.stats
                    ? this.props.stats.map((stat, index) => (
                          <div key={index}>
                              <StatContainer statType={stat.group.displayName}>
                                  <StatsTable
                                      splits={stat.splits}
                                      keys={null}
                                      headings={["Year", "Team"].concat(
                                          Object.keys(stat.splits[0].stat)
                                      )}
                                  />
                              </StatContainer>
                          </div>
                      ))
                    : null}
                <h2 className="fancy-underline">Charts</h2>
                <List>
                    {this.state.gpps ? (
                        <PieGraph
                            title={"Games Played at Each Position"}
                            idata={this.state.gpps}
                            width={this.state.graphWidth}
                            height={this.state.graphHeight}
                            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        />
                    ) : null}
                    {this.state.rfpgpy ? (
                        <BarGraph
                            title={"RFPG Per Year"}
                            leftLabel={"Range Factor Per Game"}
                            bottomLabel={"Year"}
                            idata={this.state.rfpgpy}
                            width={this.state.graphWidth}
                            height={this.state.graphHeight}
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

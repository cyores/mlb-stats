import React, { Component } from "react";
import styled from "styled-components";
import loading from "../images/loading.svg";

// components
import Hero from "../Components/Hero";
import List from "../Components/List";
import PlayerCard from "../Components/PlayerCard";

const StyledTeam = styled.div`
    min-height: 75vh;
`;

class Team extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            team: null,
            division: {},
            venue: {},
            springLeague: {},
            roster: null,
            sortType: ""
        };
        this.sort = this.sort.bind(this);
    }

    componentDidMount() {
        const teamid = this.props.match.params.id;
        fetch(`https://statsapi.mlb.com/api/v1/teams/${teamid}`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                const team = data.teams[0];
                this.setState({
                    team: team,
                    division: team.division,
                    venue: team.venue,
                    springLeague: team.springLeague
                });
            });

        fetch(`https://statsapi.mlb.com//api/v1/teams/${teamid}/roster`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({ roster: data.roster });
            });
    }

    sort(type) {
        let roster = this.state.roster;

        roster.sort(function(a, b) {
            if (a.person.fullName > b.person.fullName) return 1;
            if (a.person.fullName < b.person.fullName) return -1;
            return 0;
        });
        if (type === "Alphabetical (Desc)") roster.reverse();

        this.setState({ roster: roster, sortType: type });
    }

    render() {
        return (
            <StyledTeam>
                {this.state.team ? (
                    <Hero
                        title={this.state.team.name}
                        shortTitle={`(${this.state.team.abbreviation})`}
                        subtitle={this.state.division.name}
                        leftImagesrc={`https://www.mlbstatic.com/team-logos/${
                            this.state.team.id
                        }.svg`}
                        rightImagesrc={`	
                    https://prod-gameday.mlbstatic.com/responsive-gameday-assets/1.2.0/images/fields/${
                        this.state.venue.id
                    }.svg`}
                    >
                        <p>
                            <b>Venue: </b> {this.state.venue.name}
                        </p>
                        <p>
                            <b>First Year of Play: </b>
                            {this.state.team.firstYearOfPlay}
                        </p>
                        <p>
                            <b>Spring League: </b>
                            {this.state.springLeague.name}
                        </p>
                    </Hero>
                ) : (
                    <React.Fragment>
                        <br />
                        <div style={{ textAlign: "center" }}>
                            <img src={loading} alt="loading" />
                        </div>
                    </React.Fragment>
                )}
                <div className="container">
                    <h2 className="fancy-underline">Roster</h2>
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "1rem",
                            borderRadius: "1rem",
                            marginBottom: "1rem"
                        }}
                    >
                        <List>
                            <h5 style={{ margin: 0 }}>Sort By</h5>
                            <button
                                style={{ margin: 0 }}
                                className="button button-primary"
                                onClick={() => this.sort("Alphabetical (Asc)")}
                            >
                                Alphabetical (Asc)
                            </button>
                            <button
                                style={{ margin: 0 }}
                                className="button button-primary"
                                onClick={() => this.sort("Alphabetical (Desc)")}
                            >
                                Alphabetical (Desc)
                            </button>
                        </List>
                    </div>
                    <h5>{this.state.sortType}</h5>
                    {this.state.roster ? (
                        <List>
                            {this.state.roster.map(player => (
                                <PlayerCard
                                    key={player.person.id}
                                    imagesrc={`https://securea.mlb.com/mlb/images/players/head_shot/${
                                        player.person.id
                                    }.jpg`}
                                    name={player.person.fullName}
                                    position={player.position.abbreviation}
                                    status={player.status.description}
                                    link={`/player/${player.person.id}`}
                                    linkText={"View Player"}
                                />
                            ))}
                        </List>
                    ) : (
                        <React.Fragment>
                            <br />
                            <div style={{ textAlign: "center" }}>
                                <img src={loading} alt="loading" />
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </StyledTeam>
        );
    }
}

export default Team;

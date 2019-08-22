import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// components
import Hero from "../Components/Hero";
import List from "../Components/List";
import Card from "../Components/Card";

const StyledTeam = styled.div``;

class Team extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            team: {},
            division: {},
            venue: {},
            springLeague: {},
            roster: []
        };
    }

    componentDidMount() {
        const teamid = this.props.match.params.id;
        fetch(`https://statsapi.mlb.com/api/v1/teams/${teamid}`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log("team", data.teams[0]);
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
                console.log("roster", data.roster);
                this.setState({ roster: data.roster });
            });
    }
    render() {
        return (
            <StyledTeam>
                <Hero
                    title={this.state.team.name}
                    shortTitle={this.state.team.abbreviation}
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
                <div className="container">
                    <h2 className="fancy-underline">Roster</h2>
                    <List>
                        {this.state.roster.map(player => (
                            <Card
                                key={player.person.id}
                                imagesrc={`https://securea.mlb.com/mlb/images/players/head_shot/${
                                    player.person.id
                                }.jpg`}
                                title={player.person.fullName}
                                link={`/player/${player.person.id}`}
                                linkText={"View Player"}
                            >
                                <p>
                                    {player.position.name}, (
                                    {player.position.abbreviation})
                                </p>
                                <p>{player.status.description}</p>
                            </Card>
                        ))}
                    </List>
                </div>
            </StyledTeam>
        );
    }
}

export default Team;

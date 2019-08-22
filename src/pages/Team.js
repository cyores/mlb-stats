import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledTeam = styled.div``;

class Team extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            team: "",
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
                console.log(data.teams[0]);
                this.setState({ team: data.teams[0] });
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
                <h3>This team</h3>
                <p>{this.state.team.name}</p>
                <h5>Roster:</h5>
                {this.state.roster.map(player => (
                    <React.Fragment key={player.person.id}>
                        <p>
                            {player.person.fullName},{player.position.name}(
                            {player.position.abbreviation}),
                            {player.status.description}
                            <Link to={`/player/${player.person.id}`}>Link</Link>
                        </p>
                    </React.Fragment>
                ))}
            </StyledTeam>
        );
    }
}

export default Team;

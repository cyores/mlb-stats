import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledHome = styled.div``;

class Home extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            teams: []
        };
    }

    componentDidMount() {
        fetch("https://statsapi.mlb.com/api/v1/teams?sportId=1")
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data.teams);
                this.setState({ teams: data.teams });
            });
    }

    render() {
        return (
            <StyledHome>
                <h3>All Teams</h3>
                {this.state.teams.map(team => (
                    <React.Fragment key={team.id}>
                        <Link to={`/team/${team.id}`}>{team.name}</Link>
                        <br />
                    </React.Fragment>
                ))}
            </StyledHome>
        );
    }
}

export default Home;

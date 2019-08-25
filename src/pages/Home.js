import React, { Component } from "react";
import styled from "styled-components";
import loading from "../images/loading.svg"

// components
import List from "../Components/List";
import Card from "../Components/Card";

const StyledHome = styled.div`
    margin-top: 2%;
    min-height: 75vh;
`;

class Home extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            teams: null
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
                <div className="container">
                    <h1 className="fancy-underline">All Teams</h1>
                    <List>
                        {this.state.teams ? (
                            this.state.teams.map(team => (
                                <Card
                                    key={team.id}
                                    imagesrc={`https://www.mlbstatic.com/team-logos/${
                                        team.id
                                    }.svg`}
                                    title={team.name}
                                    link={`/team/${team.id}`}
                                    linkText={"View Team"}
                                >
                                    <p>{team.division.name}</p>
                                </Card>
                            ))
                        ) : (
                            <img src={loading} />
                        )}
                    </List>
                </div>
            </StyledHome>
        );
    }
}

export default Home;

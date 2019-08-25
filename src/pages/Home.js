import React, { Component } from "react";
import styled from "styled-components";
import loading from "../images/loading.svg";
import hh from "../images/homeHeader.jpg";

// components
import List from "../Components/List";
import Card from "../Components/Card";

const StyledHome = styled.div`
    // margin-top: 2%;
    min-height: 75vh;
`;

const StyledHeader = styled.div` 
    background: url(${hh});
    background-size: cover;
    background-position: bottom;
    margin-bottom: 3rem;
    width: 100%;
    height: 25vh;
`;

class Home extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            teams: null,
            sortType: ""
        };
        this.sort = this.sort.bind(this);
    }

    componentDidMount() {
        fetch("https://statsapi.mlb.com/api/v1/teams?sportId=1")
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data.teams);
                this.setState({ teams: data.teams, doneLoading: true });
            });
    }

    sort(type) {
        let teams = this.state.teams;
        if (type.includes("Division")) {
            teams.sort(function(a, b) {
                if (a.division.name > b.division.name) return 1;
                if (a.division.name < b.division.name) return -1;
                return 0;
            });
            if (type === "Division (Desc)") teams.reverse();
        } else {
            teams.sort(function(a, b) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });
            if (type === "Alphabetical (Desc)") teams.reverse();
        }

        this.setState({ teams: teams, sortType: type });
    }

    render() {
        return (
            <StyledHome>
                <StyledHeader/>
                <div className="container">
                    <h1 className="fancy-underline">All Teams</h1>
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
                            <button
                                style={{ margin: 0 }}
                                className="button button-primary"
                                onClick={() => this.sort("Division (Asc)")}
                            >
                                Division (Asc)
                            </button>
                            <button
                                style={{ margin: 0 }}
                                className="button button-primary"
                                onClick={() => this.sort("Division (Desc)")}
                            >
                                Division (Desc)
                            </button>
                        </List>
                    </div>
                    <h5>{this.state.sortType}</h5>
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
                            <img src={loading} alt="loading" />
                        )}
                    </List>
                </div>
            </StyledHome>
        );
    }
}

export default Home;

import React, { Component } from "react";
import styled from "styled-components";

// components
import Hero from "../Components/Hero";
import PlayerStats from "../Components/PlayerStats";

const StyledPlayer = styled.div`
    min-height: 75vh;
`;

class Player extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            player: "",
            position: {},
            pitchHand: {},
            batSide: {},
            stats: []
        };
    }

    componentDidMount() {
        const personid = this.props.match.params.id;

        fetch(
            `https://statsapi.mlb.com/api/v1/people/${personid}?hydrate=stats(group=[hitting,pitching,fielding],type=[yearByYear])`
        )
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log("player", data.people[0]);
                console.log("stats", data.people[0].stats);
                this.setState({
                    player: data.people[0],
                    pitchHand: data.people[0].pitchHand,
                    batSide: data.people[0].batSide,
                    position: data.people[0].primaryPosition,
                    stats: data.people[0].stats
                });
            });
    }

    render() {
        const player = this.state.player;
        const stats = this.state.stats;
        const position = this.state.position;
        const pitchHand = this.state.pitchHand;
        const batSide = this.state.batSide;
        return (
            <StyledPlayer>
                <Hero
                    title={player.fullFMLName}
                    shortTitle={`#${player.primaryNumber}`}
                    subtitle={position.name}
                    bgImagesrc={`https://securea.mlb.com/images/players/action_shots/${
                        player.id
                    }.jpg`}
                    leftImagesrc={`https://securea.mlb.com/mlb/images/players/head_shot/${
                        player.id
                    }.jpg`}
                >
                    <div className="row">
                        <div className="six columns text-left">
                            <div className="row">
                                <span>
                                    <b>Hometown: </b>
                                    {player.birthCity},{" "}
                                    {player.birthStateProvince},{" "}
                                    {player.birthCountry}
                                </span>
                            </div>
                            <div className="row">
                                <span>
                                    <b>Birthday: </b> {player.birthDate}
                                </span>
                            </div>
                            <div className="row">
                                <span>
                                    <b>Age: </b> {player.currentAge}
                                </span>
                            </div>
                            <div className="row">
                                <span>
                                    <b>MLB Debut: </b> {player.mlbDebutDate}
                                </span>
                            </div>
                            <div className="row">
                                <span>
                                    <b>Draft Year: </b> {player.draftYear}
                                </span>
                            </div>
                        </div>
                        <div className="six columns text-left">
                            <div className="row">
                                <span>
                                    <b>Gender: </b>
                                    {player.gender}
                                </span>
                            </div>
                            <div className="row">
                                <span>
                                    <b>Height: </b> {player.height}
                                </span>
                            </div>
                            <div className="row">
                                <span>
                                    <b>Weight: </b> {player.weight}lbs
                                </span>
                            </div>
                            <div className="row">
                                <span>
                                    <b>Pitch Hand: </b> {pitchHand.description}
                                </span>
                            </div>
                            <div className="row">
                                <span>
                                    <b>Bat Side: </b> {batSide.description}
                                </span>
                            </div>
                        </div>
                    </div>
                </Hero>
                <PlayerStats stats={stats} />
            </StyledPlayer>
        );
    }
}

export default Player;

import React, { Component } from "react";
import styled from "styled-components";

const StyledPlayer = styled.div``;

class Player extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            player: "",
            stats: []
        };
    }

    componentDidMount() {
        const personid = this.props.match.params.id;
        // fetch(`https://statsapi.mlb.com/api/v1/people/${personid}`)
        //     .then(results => {
        //         return results.json();
        //     })
        //     .then(data => {
        //         console.log('player', data.people[0]);
        //         this.setState({ person: data.person });
        //     });

        fetch(`https://statsapi.mlb.com/api/v1/people/${personid}?hydrate=stats(group=[hitting,pitching,fielding],type=[yearByYear])`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log('player', data.people[0]);
                console.log('stats', data.people[0].stats);
                this.setState({ player: data.people[0], stats: data.people[0].stats });
            });
    }

    render() {
        const player = this.state.player;
        return (
            <StyledPlayer>
                <h2>{player.fullFMLName}</h2>
                <p>{player.birthCity}, {player.birthCountry}</p>
                <p>{player.birthDate}</p>
            </StyledPlayer>
        );
    }
}

export default Player;

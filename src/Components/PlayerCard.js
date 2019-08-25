import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledPlayerCard = styled.div`
    position: relative;
    padding: 2rem;
    padding-top: 0.25rem;
    text-align: center;
    margin-bottom: 3rem;
    background: #fff;
    border-radius: 1rem;
    width: 213px;
    height: 320px;
    background-size: cover;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    @media(max-width: 768px) {
        width: 250px;
    }
`;

const StyledFooter = styled.div`
    position: absolute;
    bottom: 1rem;
    width: inherit;
    @media(max-width: 768px) {
        width: 250px;
    }
`;

class PlayerCard extends Component {
    state = {};

    render() {
        return (
            <StyledPlayerCard
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0) 75%, rgba(255,255,255,0.75)),
                     url(${this.props.imagesrc})`
                }}
            >
                <h5>
                    {this.props.name} ({this.props.position})
                </h5>
                <StyledFooter>
                    <div className="row">
                        <div className="column">{this.props.children}</div>
                    </div>

                    <br />

                    <Link
                        className="button button-primary u-full-width"
                        to={{
                            pathname: this.props.link,
                            state: this.props.name
                        }}
                    >
                        {this.props.linkText}
                    </Link>
                </StyledFooter>
            </StyledPlayerCard>
        );
    }
}

export default PlayerCard;

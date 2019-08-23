import React, { Component } from "react";
import styled from "styled-components";

const StyledHero = styled.div`
    width: 100%;
    background: #222;
    color: #ddd;
    margin-bottom: 2.5rem;
    padding: 2rem 0;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 100% 0%;
    @media (max-width: 768px) {
        background-position: center;
        background-size: cover;
    }
`;

class Hero extends Component {
    state = {};

    render() {
        return (
            <StyledHero
                style={{
                    backgroundImage: `linear-gradient(to right,rgba(34, 34, 34, 1) 55%,rgba(0, 0, 0, 0)),
                        url(${this.props.bgImagesrc})`
                }}
            >
                <div className="row text-center">
                    <div className="four columns">
                        <img
                            alt="Hero Left"
                            style={{ maxHeight: "33vh", borderRadius: "1rem" }}
                            src={this.props.leftImagesrc}
                        />
                    </div>
                    <div className="four columns">
                        <h1>
                            {this.props.title} {this.props.shortTitle}
                        </h1>
                        <h4>{this.props.subtitle}</h4>
                        {this.props.children}
                    </div>
                    {this.props.rightImagesrc ? (
                        <div className="four columns">
                            <img
                                alt="Hero Right"
                                style={{ maxHeight: "33vh" }}
                                src={this.props.rightImagesrc}
                            />
                        </div>
                    ) : null}
                </div>
            </StyledHero>
        );
    }
}

export default Hero;
